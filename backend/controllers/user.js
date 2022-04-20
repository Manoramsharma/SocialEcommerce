const UsersService = require('../services/users.service');
const MailerService = require('../services/mailer.service');
const productModel = require('../models/product');
const userModel = require('../models/userModel');
const l = require('../common/logger');
const jwt = require('jsonwebtoken');

class Controller {
  async getUser(req, res, next) {
    try {
      const token = req.header('Authorization');
      if (token != 'undefined') {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const uservisitor = await userModel.findOne({ _id: decoded.id });

        const uservisitorcheck = await userModel.find({
          username: req.params.id,
          profilevisitors: uservisitor.username,
        });
        if (uservisitorcheck.length === 0) {
          await userModel.findOneAndUpdate(
            { username: req.params.id },
            {
              $push: {
                profilevisitors: uservisitor.username,
              },
            },
          );
        }
      }
      const user = await userModel
        .findOne({ username: req.params.id })
        .select('-password -resetPasswordExpire -resetPasswordToken')
        .populate('followers following cart.product', 'avatar username fullname');
      if (!user) throw { status: 404, message: 'User not found' };
      user.cart = user.cart.filter((item) => item.product != null);
      user.save();
      res.status(200).json({ user });
    } catch (error) {
      l.error('[GET USER CONTROLLER]', req);
      next(error);
    }
  }
  async searchuser(req, res, next) {
    try {
      const users = await userModel
        .find({ username: { $regex: req.query.username } })
        .limit(10)
        .select('fullname username avatar');

      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      if (req.body.username !== req.user.username) {
        const user_name = await userModel.findOne({ username: req.body.username });
        if (user_name) {
          return res.status(500).json({ message: 'This user name already exists.' });
        }
      }
      UsersService.updateUser(req.body, req.user.avatar, req.user._id);
      res.status(200).json({ message: 'Profile Update Successfully' });
    } catch (error) {
      l.error('[UPDATE USER]', req);
      next(error);
    }
  }
  async follow(req, res, next) {
    try {
      const user = await userModel.find({
        _id: req.params.id,
        followers: req.user._id,
      });
      if (user.length > 0) return res.status(500).json({ message: 'You followed this user.' });

      const newUser = await userModel
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            $push: {
              followers: req.user._id,
              notifications: {
                userAvatar: req.user.avatar,
                message: `${req.user.fullname} started following you`,
                url: `/profile/${req.user.username}`,
              },
              unreadnotifications: {
                userAvatar: req.user.avatar,
                message: `${req.user.fullname} started following you`,
                url: `/profile/${req.user.username}`,
              },
            },
          },
          { new: true },
        )
        .populate('followers following', '-password');

      await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: { following: req.params.id },
        },
        { new: true },
      );

      res.json({ newUser });
    } catch (error) {
      next(error);
    }
  }
  async unfollow(req, res, next) {
    try {
      const newUser = await userModel
        .findOneAndUpdate(
          { _id: req.params.id },
          {
            $pull: { followers: req.user._id },
          },
          { new: true },
        )
        .populate('followers following', '-password');

      await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: { following: req.params.id },
        },
        { new: true },
      );

      res.json({ newUser });
    } catch (error) {
      next(error);
    }
  }
  async rating(req, res, next) {
    try {
      const user = await userModel.find({
        _id: req.params.id,
        'rating.user': req.user._id,
      });
      if (user.length > 0) {
        await userModel.update(
          {
            _id: req.params.id,
            'rating.user': req.user._id,
          },
          {
            $set: {
              'rating.$.rated': req.params.rate,
            },
          },
        );
        return res.status(200).json({ message: 'rating updated successfull' });
      }
      const data = await userModel
        .findOneAndUpdate(
          {
            _id: req.params.id,
          },
          {
            $push: {
              rating: {
                user: req.user._id,
                rated: req.params.rate,
              },
            },
          },
          { upsert: true, new: true },
        )
        .populate('rating.user');
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async searchUserAPI(req, res, next) {
    try {
      const searchField = req.query.name;
      const res1 = await userModel
        .find({
          fullname: { $regex: searchField, $options: '$i' },
        })
        .select('fullname username avatar');

      const res2 = await productModel
        .find({ productName: { $regex: searchField, $options: '$i' } })
        .select('images productName user')
        .populate('user', 'avatar fullname username');
      res.status(200).json({ users: res1, products: res2 });
    } catch (error) {
      next(error);
    }
  }
  /* async deleteProduct(id) {
    try {
      const product = await productModel.findById(id);
      this.deleteImages(product.images).then((_) => {
        productModel.deleteOne({ _id: id }, function (err, __) {
          if (err) {
            throw err;
          }
        });
      });
    } catch (error) {
      l.error('[DELETE PRODUCT SERVICE]', id);
      throw error;
    }
  } */
  async deleteUnreadNotifications(req, res, next) {
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) throw { status: 404, message: 'user does not exist' };

      let blank = [];
      user.unreadnotifications = blank;
      let unreadnotifications = user.unreadnotifications;
      user.save();

      res.status(200).json({ message: 'noti fication opened' });
    } catch (error) {
      next(error);
    }
  }
  addToWishlist = async (req, res) => {
    try {
      const findWishlist = await Users.find({
        _id: req.user._id,
        'wishlist.product': req.params.id,
      });
      if (findWishlist.length > 0) {
        //already in the wishlist
        // we can update quantity
        if (req.params.quantity === '0') {
          console.log('in 0 quantity');
          //remove product from wishlist

          const data = await Users.update(
            {
              _id: req.user._id,
              'wishlist.product': req.params.id,
            },
            {
              $pull: {
                wishlist: {
                  product: req.params.id,
                },
              },
            },
            { new: true },
          );
          return res.status(200).json({ msg: ' wishlist item deleted successfully' });
        } else {
          //update quantity in wishlist
          console.log('in update quantity');
          const data = await Users.update(
            {
              _id: req.user._id,
              'wishlist.product': req.params.id,
            },
            {
              $set: {
                'wishlist.$.quantity': req.params.quantity,
                'wishlist.$.size': req.params.size,
              },
            },
          ).populate('wishlist.product');
          const result = await Users.findOne({ _id: req.user._id }).populate('wishlist.product');
          return res.status(200).send(result.wishlist);
        }
      }
      if (req.params.quantity === '0') {
        res.status(400).send(data.wishlist);
      } else {
        const data = await Users.findOneAndUpdate(
          {
            _id: req.user._id,
          },
          {
            $push: {
              wishlist: {
                product: req.params.id,
                quantity: req.params.quantity,
                size: req.params.size,
              },
            },
          },
          { upsert: true, new: true },
        ).populate('wishlist.product');
        res.send(data.wishlist);
      }
    } catch (error) {
      console.log(error);
      res.send({ msg: error.message });
    }
  };
  async contactUs(req, res, next) {
    try {
      const { name, phone, email, message } = req.body;
      if (!name || !phone || !email || !message) {
        res.status(400).json({ message: 'Fields required!' });
      } else {
        await MailerService.contactUs(name, phone, email, message);
        res.status(200).json({ message: 'Contact us mail sent successfully' });
      }
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new Controller();

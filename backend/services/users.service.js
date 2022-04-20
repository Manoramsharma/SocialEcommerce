const l = require('../common/logger');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const otpModel = require('../models/otp');
const otpGenerator = require('../utils/otpGenerator');
const ProductsService = require('./products.service');
const MailerService = require('./mailer.service');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);

const { validateEmail, validatePassword } = require('../utils/validator');
// const validateEmail = require('../utils/validator');
// const validatePassword = require('../utils/validator');
class UsersService {
  /**
   * Forgot password service
   * @param {string} email - Email address of user
   */
  async forgotPassword(email) {
    try {
      const user = await userModel.findOne({ email });
      if (!user) throw { status: 400, message: 'User not found' };

      const otp = otpGenerator();
      const promises = [];

      promises.push(
        otpModel.updateOne({ _id: email }, { otp }, { upsert: true, setDefaultsOnInsert: true }),
      );
      promises.push(MailerService.sendPasswordResetEmail(user.email, user.fullname, otp));

      await Promise.all(promises);
    } catch (err) {
      l.error('[FORGOT PASSWORD]', err, email);
      throw err;
    }
  }
  /**
   *
   * @param {string} email email number of students to
   * @param {integer} otp OTP to reset password
   * @param {string} password new password
   */
  async resetPassword(email, otp, password) {
    try {
      const user = await userModel.findOne({ email });
      if (!user) throw { status: 400, message: 'User not found, Sign Up instead!' };

      const otpFind = await otpModel.findById(email);

      if (!otpFind) throw { status: 400, message: 'Please request for a new OTP first' };

      console.log(typeof otpFind.otp, typeof otp);
      if (otpFind.otp !== otp) throw { status: 400, message: 'Invalid OTP' };

      const hash = await bcrypt.hash(password, 12);

      const promises = [];
      promises.push(
        userModel.findOneAndUpdate(
          { email },
          {
            password: hash,
          },
        ),
      );
      promises.push(otpModel.findOneAndDelete({ email }));
      await Promise.all(promises);
    } catch (err) {
      l.error('[RESET PASSWORD]', err);
      throw err;
    }
  }
  /**
   *
   * @param {string} body details of user profile
   * @param {string} avatar previous avatar of user
   * @param {string} id id of user
   */
  async updateUser(body, avatar, id) {
    try {
      const { fullname, username, mobile, address, gender, bio, pincode, file } = body;
      if (file) {
        console.log('in file');
        if (avatar.split('/')[2] === 'res.cloudinary.com') {
          await ProductsService.deleteImages([avatar]);
        }
        const newAvatar = await ProductsService.uploadImages([file]);
        await userModel.findByIdAndUpdate(
          id,
          {
            $set: {
              fullname,
              username,
              mobile,
              address,
              gender,
              bio,
              pincode,
              avatar: newAvatar[0],
            },
          },
          {
            upsert: true,
            new: true,
          },
        );
      } else {
        await userModel.findByIdAndUpdate(
          id,
          {
            $set: {
              fullname,
              username,
              mobile,
              address,
              gender,
              bio,
              pincode,
            },
          },
          {
            upsert: true,
            new: true,
          },
        );
      }
    } catch (error) {
      throw error;
    }
    var { fullname, username, mobile, address, gender, bio, pincode, file } = body;
  }
  /**
   *
   * @param {string} email email id of user
   * @param {string} password password of user
   * @returns success message, access_token, user details, refresh_token
   */
  async login(email, password) {
    const user = await userModel
      .findOne({ email: email })
      .populate('followers following', 'avatar username fullname followers following');
    user.cart = user.cart.filter((item) => item.product != null);
    user.save();

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) throw { status: 401, message: 'Incorrect Password' };

    const refresh_token = await this.createRefreshToken({ id: user._id });
    const access_token = await this.createAccessToken({ id: user._id });

    return {
      message: 'Login Success!',
      access_token,
      user: { ...user._doc, password: '' },
      refresh_token,
    };
  }
  /**
   *
   * @param {string} fullname fullname of user
   * @param {string} username username of user
   * @param {string} email email id of user
   * @param {string} password password of user
   * @param {string} gender gender of user
   * @returns success message, access_token, user details, refresh_token
   */
  async register(fullname, username, email, password, gender) {
    try {
      username = username.toLowerCase().replace(/ /g, '');

      const checkUsername = await userModel.findOne({ username });
      if (checkUsername) throw { status: 400, message: 'Username already in use' };

      const checkEmail = await userModel.findOne({ email });

      if (checkEmail) throw { status: 400, message: 'Email already exists' };

      if (!validateEmail(email)) throw { status: 400, message: 'Email is not valid' };

      if (!validatePassword(password)) throw { status: 400, message: 'Password is not valid' };

      password = await bcrypt.hash(password, 12);

      const user = await userModel.create({ fullname, username, email, password, gender });

      const refresh_token = await this.createRefreshToken({ id: user._id });
      const access_token = await this.createAccessToken({ id: user._id });

      return {
        message: 'Register Success!',
        access_token,
        user: { ...user._doc, password: '' },
        refresh_token,
      };
    } catch (error) {
      throw error;
    }
  }

  async socialLogin(email, name, picture) {
    var user = await userModel.findOne({ email: email });

    if (user) {
      const refresh_token = await this.createRefreshToken({ id: user._id });
      const access_token = await this.createAccessToken({ id: user._id });

      return {
        message: 'Login Success!',
        access_token,
        user: { ...user._doc, password: '' },
        refresh_token,
      };
    } else {
      user = await userModel.create({
        email,
        fullname: name,
        avatar: picture,
      });

      const refresh_token = await this.createRefreshToken({ id: user._id });
      const access_token = await this.createAccessToken({ id: user._id });

      return {
        message: 'Register Success!',
        access_token,
        user: { ...user._doc, password: '' },
        refresh_token,
      };
    }
  }
  async createAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
  }
  async createRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30d',
    });
  }
}
module.exports = new UsersService();

const UsersService = require('../services/users.service');
const userModel = require('../models/userModel');
const xss = require('xss');
const l = require('../common/logger');
const jwt = require('jsonwebtoken');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.GOOGLE_CLIENT_ID);

class Controller {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await userModel.findOne({ email });
      if (!findUser) throw { status: 400, message: 'User not found' };
      const { message, access_token, user, refresh_token } = await UsersService.login(
        email,
        password,
      );
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });
      res.status(200).json({ message, access_token, user });
    } catch (error) {
      next(error);
    }
  }
  async register(req, res, next) {
    try {
      var { fullname, username, email, password, gender } = req.body;

      const { message, access_token, user, refresh_token } = await UsersService.register(
        fullname,
        username,
        email,
        password,
        gender,
      );
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });
      res.status(200).json({ message, access_token, user });
    } catch (error) {
      next(error);
    }
  }
  async googleLogin(req, res, next) {
    try {
      const { tokenId } = req.body;

      const verify = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email, name, picture } = verify.payload;

      const { message, access_token, user, refresh_token } = await UsersService.socialLogin(
        email,
        name,
        picture,
      );
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });
      res.status(200).json({ message, access_token, user });
    } catch (error) {
      next(error);
    }
  }
  async facebooklogin(req, res, next) {
    try {
      const { name, email, picture } = req.body;
      const url = picture.data.url;
      const { message, access_token, user, refresh_token } = await UsersService.socialLogin(
        email,
        name,
        url,
      );
      res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });
      res.status(200).json({ message, access_token, user });
    } catch (error) {
      next(error);
    }
  }
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await userModel.findOne({ email });
      if (user) {
        await UsersService.forgotPassword(email);
        res.status(200).json({ message: 'Reset Email Sent Successful!' });
      } else {
        res.status(400).json({ message: 'Email not registered, Sign up instead' });
      }
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req, res, next) {
    try {
      let { email, otp, newPassword, confirmPassword } = req.body;

      if (!newPassword || !confirmPassword) throw { status: 400, message: 'Invalid Password' };

      if (newPassword !== confirmPassword) {
        res.status(400).json({ message: 'Password does not match!' });
      }
      await UsersService.resetPassword(email, otp, newPassword);
      res.status(200).json({ message: 'Password Reset Successful!' });
    } catch (err) {
      console.log(err.message);
      next(err);
    }
  }
  async logout(_, res, next) {
    try {
      res.clearCookie('refreshtoken', { path: '/api/refresh_token' });
      return res.json({ message: 'Logged out!' });
    } catch (error) {
      next(error);
    }
  }
  async generateAccessToken(req, res, next) {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) throw { status: 400, message: 'Please login now' };

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err) throw { status: 400, message: 'Please login now' };

        const user = await userModel
          .findById(result.id)
          .select('-password')
          .populate('followers following cart.product ');
        if (!user) throw { status: 400, message: 'User does not exist' };
        user.cart = user.cart.filter((item) => item.product != null);
        user.save();

        const access_token = await UsersService.createAccessToken({ id: result.id });

        res.status(200).json({
          access_token,
          user,
        });
      });
    } catch (error) {
      l.error('[GENERATE ACCESS TOKEN]');
      next(error);
    }
  }
}
module.exports = new Controller();

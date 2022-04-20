const express = require('express');
const router = express.Router();
const { addToWishlist } = require('../controllers/user');

const Controller = require('../controllers/user');

const auth = require('../middlewares/auth');
router.get('/search', Controller.searchuser);
router.get('/user/:id', Controller.getUser);
router.patch('/user', auth, Controller.updateUser);
router.patch('/user/:id/follow', auth, Controller.follow);
router.patch('/user/:id/unfollow', auth, Controller.unfollow);
router.post('/user/rating/:id/:rate', auth, Controller.rating);
router.get('/searchuser', Controller.searchUserAPI);
router.delete('/user/deleteunreadnotifications', auth, Controller.deleteUnreadNotifications);
router.post('/wishlist/update/:id/:quantity/:size', auth, addToWishlist);
router.post('/contactus', Controller.contactUs);

module.exports = router;

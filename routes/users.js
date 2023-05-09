const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserByID, getUsers, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getCurrentUser);

userRouter.get('/users/:userId', getUserByID);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern((/^(http|https|ftp):\/\/(([a-z0-9][a-z0-9_-]*)(\.[a-z0-9][a-z0-9_-]*)+)\/(([a-z0-9][a-z0-9_-]*)(\.[a-z0-9][a-z0-9_-]*)+)/i)),
  }),
}), updateAvatar);

module.exports = userRouter;

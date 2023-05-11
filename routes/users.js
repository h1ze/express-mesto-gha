const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const REG_EXP = require('../config/regular');

const {
  getUserByID, getUsers, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/me', getCurrentUser);

userRouter.get('/users/:userId', celebrate({
  // валидируем userId
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
}), getUserByID);

userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(REG_EXP),
  }),
}), updateAvatar);

module.exports = userRouter;

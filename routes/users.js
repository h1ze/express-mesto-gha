const userRouter = require('express').Router();
// const User = require('../models/user');
const {
  createUser, getUserByID, getUsers, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserByID);

userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateUser);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;

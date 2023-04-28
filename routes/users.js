const userRouter = require('express').Router();
// const User = require('../models/user');
const { createUser, getUserByID, getUsers } = require('../controllers/users');

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', getUserByID);

userRouter.post('/users', createUser);

module.exports = userRouter;

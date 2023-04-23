const router = require('express').Router();
// const User = require('../models/user');
const { createUser, getUserByID, getUsers } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserByID);

router.post('/users', createUser);

module.exports = router;

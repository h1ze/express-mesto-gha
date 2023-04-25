const router = require('express').Router();
// const User = require('../models/user');
const { createCard, deleteCardByID, getCards } = require('../controllers/cards');

router.get('/cards', getCards);

router.get('/cards/:cardId', deleteCardByID);

router.delete('/cards', createCard);

module.exports = router;

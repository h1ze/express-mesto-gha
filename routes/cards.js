const cardRouter = require('express').Router();
// const User = require('../models/user');
const { createCard, deleteCardByID, getCards } = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.get('/cards/:cardId', deleteCardByID);

cardRouter.delete('/cards', createCard);

module.exports = cardRouter;

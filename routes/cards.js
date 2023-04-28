const cardRouter = require('express').Router();
// const User = require('../models/user');
const { createCard, deleteCardByID, getCards } = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCardByID);

cardRouter.post('/cards', createCard);

module.exports = cardRouter;

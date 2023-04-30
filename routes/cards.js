const cardRouter = require('express').Router();

const {
  createCard, deleteCardByID, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCardByID);

cardRouter.post('/cards', createCard);

cardRouter.put('/cards/:cardId/likes', likeCard);

cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;

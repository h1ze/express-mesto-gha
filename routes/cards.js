const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard, deleteCardByID, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', deleteCardByID);

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
}), createCard);

cardRouter.put('/cards/:cardId/likes', likeCard);

cardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRouter;

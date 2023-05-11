const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const REG_EXP = require('../config/regular');

const {
  createCard, deleteCardByID, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', celebrate({
  // валидируем cardId
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteCardByID);

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REG_EXP),
  }),
}), createCard);

cardRouter.put('/cards/:cardId/likes', celebrate({
  // валидируем cardId
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), likeCard);

cardRouter.delete('/cards/:cardId/likes', celebrate({
  // валидируем cardId
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24).hex(),
  }),
}), dislikeCard);

module.exports = cardRouter;

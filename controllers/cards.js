const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCardByID = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => {
      // if (!user) {
      //   res.status(404).send({ message: 'Не найден пользователь' });
      // }
      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

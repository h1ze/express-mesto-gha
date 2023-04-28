const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.message.includes('user validation failed')) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.getUserByID = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Не найден пользователь' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message.includes('failed')) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateUser = ((req, res) => {
  // обновим имя найденного по _id пользователя
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then(() => res.send({ data: { name, about } }))
    .catch((err) => {
      if (err.message.includes('failed')) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
});

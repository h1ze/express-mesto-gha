const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/token');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const ServerError = require('../errors/server-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next(new ServerError('На сервере произошла ошибка')));
};

module.exports.createUser = (req, res, next) => {
  if (!req.body) {
    throw new BadRequestError('Invalid request body');
  }
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else if (err.code === 11000) {
        next(new ConflictError('Email должен быть уникальным'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.getUserByID = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.updateUser = ((req, res, next) => {
  // обновим имя найденного по _id пользователя
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
});

module.exports.updateAvatar = ((req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные при запросе'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
});

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
      const token = generateToken({ _id: user._id });
      res.send({ token });
    })
    .catch(next(new ServerError('На сервере произошла ошибка')));
};

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../utils/token');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

// module.exports.getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send({ data: users }))
//     .catch((err) => res.status(500).send({ message: err.message }));
// };

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// module.exports.createUser = (req, res) => {
//   if (!req.body) {
//     res.status(400).send({ message: 'Invalid request body' });
//     return;
//   }
//   const {
//     name, about, avatar, email, password,
//   } = req.body;
//   bcrypt.hash(password, 10)
//     .then((hash) => User.create({
//       name, about, avatar, email, password: hash,
//     }))
//     .then((user) => res.status(201).send({
//       data: {
//         name: user.name, about: user.about, avatar: user.avatar, email: user.email,
//       },
//     }))
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         const message = Object.values(err.errors).map((error) => error.message).join('; ');
//         res.status(400).send({ message });
//       } else {
//         res.status(500).send({ message: err.message });
//       }
//     });
// };

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
      } else {
        next(err);
      }
    });
};

// module.exports.getUserByID = (req, res) => {
//   User.findById(req.params.userId)
//     .orFail(() => {
//       throw new Error('Запрашиваемый пользователь не найден');
//     })
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       if (err.message === 'Запрашиваемый пользователь не найден') {
//         res.status(404).send({ message: err.message });
//       } else if (err.name === 'CastError') {
//         res.status(400).send({ message: err.message });
//       } else {
//         res.status(500).send({ message: err.message });
//       }
//     });
// };

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
        next(err);
      }
    });
};

// module.exports.updateUser = ((req, res) => {
//   // обновим имя найденного по _id пользователя
//   const { name, about } = req.body;
//   User.findByIdAndUpdate(req.user._id, { name, about }, {
//     new: true, // обработчик then получит на вход обновлённую запись
//     runValidators: true, // данные будут валидированы перед изменением
//   })
//     .orFail(() => {
//       throw new Error('Запрашиваемый пользователь не найден');
//     })
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       if (err.message === 'Запрашиваемый пользователь не найден') {
//         res.status(404).send({ message: err.message });
//       } else if (err.name === 'ValidationError') {
//         const message = Object.values(err.errors).map((error) => error.message).join('; ');
//         res.status(400).send({ message });
//       } else if (err.name === 'CastError') {
//         res.status(400).send({ message: err.message });
//       } else {
//         res.status(500).send({ message: err.message });
//       }
//     });
// });

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
        next(err);
      }
    });
});

// module.exports.updateAvatar = ((req, res) => {
//   const { avatar } = req.body;
//   User.findByIdAndUpdate(req.user._id, { avatar }, {
//     new: true, // обработчик then получит на вход обновлённую запись
//     runValidators: true, // данные будут валидированы перед изменением
//   })
//     .orFail(() => {
//       throw new Error('Запрашиваемый пользователь не найден');
//     })
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       if (err.message === 'Запрашиваемый пользователь не найден') {
//         res.status(404).send({ message: err.message });
//       } else if (err.name === 'ValidationError') {
//         const message = Object.values(err.errors).map((error) => error.message).join('; ');
//         res.status(400).send({ message });
//       } else if (err.name === 'CastError') {
//         res.status(400).send({ message: err.message });
//       } else {
//         res.status(500).send({ message: err.message });
//       }
//     });
// });

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
        next(err);
      }
    });
});

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
      const token = generateToken({ _id: user._id });
      res.send({ token });
    })
    .catch(next);
};

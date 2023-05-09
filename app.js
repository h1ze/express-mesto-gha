const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const ConflictError = require('./errors/conflict-err');
const ServerError = require('./errors/server-err');

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(helmet());

// роуты, не требующие авторизации,
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern((/^(http|https|ftp):\/\/(([a-z0-9][a-z0-9_-]*)(\.[a-z0-9][a-z0-9_-]*)+)\/(([a-z0-9][a-z0-9_-]*)(\.[a-z0-9][a-z0-9_-]*)+)/i)),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

// обработчики ошибок

app.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок

app.use((err, req, res, next) => {
  let error;

  if (err.code === 11000) {
    error = new ConflictError('Email должен быть уникальным');
  } else if (err.statusCode) {
    error = err;
  } else {
    error = new ServerError('На сервере произошла ошибка');
  }

  const { statusCode, message } = error;
  res.status(statusCode).send({ message });

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

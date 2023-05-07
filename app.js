const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use(helmet());

// роуты, не требующие авторизации,
app.post('signin', login);
app.post('signup', createUser);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не существует' });
});

app.listen(PORT, () => {
  console.log(`Server stared on port ${PORT}!`);
});

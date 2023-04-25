const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133', // вставить ID созданного пользователя
  };

  next();
});

app.use(require('./routes/users'));
app.use(require('./routes/cards'));

// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'Страница не найдена' });
// });

app.listen(PORT, () => {
  console.log(`Server stared on port ${PORT}!`);
});

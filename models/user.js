const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле "about" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "about" - 2'],
    maxlength: [30, 'Максимальная длина поля "about" - 30'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле "avatar" должно быть заполнено'],
    validate: {
      validator: (value) => {
        (/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i).test(value);
      },
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: [true, 'Email должен быть уникальным'],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Некорректный Email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);

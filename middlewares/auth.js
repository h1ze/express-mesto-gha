const { checkToken } = require('../utils/token');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  // Убираем Bearer, оставляем только строку с токеном
  const token = authorization.replace('Bearer ', '');

  // верифицируем токен
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = checkToken(token);
  } catch (err) {
    // отправим ошибку, если не получилось
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

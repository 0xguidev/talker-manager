const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.length > 0) {
    const msgObrigatorio = 'O campo \"email\" é obrigatório';
    return res.status(400).json({ message: msgObrigatorio });
  }

  if (
    !email.includes('@')
    || !email.includes('.com')
  ) {
    const msgEmail = 'O \"email\" deve ter o formato \"email@email.com\"';
    return res.status(400).json({ message: msgEmail });
  }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.length > 0) {
    const msgPassValid = 'O campo \"password\" é obrigatório';
    return res.status(400).json({ message: msgPassValid });
  }

  if (password.length < 6) {
    const msgPass = 'O \"password\" deve ter pelo menos 6 caracteres';
    return res.status(400).json({ message: msgPass });
  }
  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
};
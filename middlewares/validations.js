const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || !email.length > 0) {
    const msgObrigatorio = 'O campo "email" é obrigatório';
    return res.status(400).json({ message: msgObrigatorio });
  }

  if (
    !email.includes('@')
    || !email.includes('.com')
  ) {
    const msgEmail = 'O "email" deve ter o formato "email@email.com"';
    return res.status(400).json({ message: msgEmail });
  }
  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.length > 0) {
    const msgPassValid = 'O campo "password" é obrigatório';
    return res.status(400).json({ message: msgPassValid });
  }

  if (password.length < 6) {
    const msgPass = 'O "password" deve ter pelo menos 6 caracteres';
    return res.status(400).json({ message: msgPass });
  }
  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const isTalkerNameValid = (req, res, next) => {
  const { name } = req.body;
  
  if (!name || name.length <= 0) {
    const msgNameError = 'O campo "name" é obrigatório';
    return res.status(400).json({ message: msgNameError });
  }
  
  if (name.length < 3) {
    const msgNameInvalid = 'O "name" deve ter pelo menos 3 caracteres';
    return res.status(400).json({ message: msgNameInvalid });
  }

  next();
};

const isTalkerAgeValid = (req, res, next) => {
  const { age } = req.body;
  
  if (
    !age
    ) {
      const msgAgeError = 'O campo "age" é obrigatório';
      return res.status(400).json({ message: msgAgeError });
  }

  if (age < 18) {
    const msgAgeInvalid = 'A pessoa palestrante deve ser maior de idade';
    return res.status(400).json({ message: msgAgeInvalid });
  }

  next();
};

const isTalkerTalkValid = (req, res, next) => {
  const { talk } = req.body;
 
  if (!talk || !talk.watchedAt || talk.rate === undefined) { //  
        const msgField = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
        return res.status(400).json({ message: msgField });
      }

  const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/;
  const dateIsValid = talk.watchedAt.match(dateRegex);
  
  if (!dateIsValid) {
    const msgDateInvalid = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
    return res.status(400).json({ message: msgDateInvalid });
  }

  next();
};

const isTalkerTalkRateValid = (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate < 1 || talk.rate > 5) {
    const msgTalkRateErro = 'O campo "rate" deve ser um inteiro de 1 à 5';
    return res.status(400).json({ message: msgTalkRateErro });
  }
  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isTalkerNameValid,
  isTalkerAgeValid,
  isTalkerTalkValid,
  isTalkerTalkRateValid,
};
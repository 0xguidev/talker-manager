const router = require('express').Router();
const {
  readContentFile,
  writeContentFile,
} = require('../helpers/readWriteFile');

const {
  isValidToken,
  isTalkerNameValid,
  isTalkerAgeValid,
  isTalkerTalkValid,
  isTalkerTalkRateValid,
} = require('../middlewares/validations');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const talker = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talker);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE);
  const talk = talkers.find((item) => item.id === parseInt(id, 10));

  if (!talk) return next({ statusCode: 404, message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talk);
});

router.post(
  '/',
  isValidToken,
  isTalkerNameValid,
  isTalkerAgeValid,
  isTalkerTalkValid,
  isTalkerTalkRateValid,
  async (req, res) => {
    const talkers = await readContentFile(PATH_FILE);
    const newId = talkers.length + 1;
    const newTalker = {
      id: newId,
      ...req.body,
    };
    await writeContentFile(PATH_FILE, newTalker);
    res.status(201).json(newTalker);
  },
);

module.exports = router;

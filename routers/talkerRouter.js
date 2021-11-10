const router = require('express').Router();
const {
  readContentFile,
  // writeContentFile,
} = require('../helpers/readWriteFile');

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

module.exports = router;

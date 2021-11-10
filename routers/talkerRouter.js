const router = require('express').Router();
const {
  readContentFile,
  // writeContentFile,
} = require('../helpers/readWriteFile');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const talker = await readContentFile(PATH_FILE) || [];

  res.status(200).json({ talker });
});

module.exports = router;

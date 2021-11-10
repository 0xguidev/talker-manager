const express = require('express');
const bodyParser = require('body-parser');
const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerRouter = require('./routers/talkerRouter')

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});

const express = require('express');
const bodyParser = require('body-parser');
const talkerRouter = require('./routers/talkerRouter');
const loginRouter = require('./routers/loginRouter');
const error = require('./middlewares/routerNotFound');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.use('/login', loginRouter);

app.use(error.routerNotFound);
app.listen(PORT, () => {
  console.log('Online');
});

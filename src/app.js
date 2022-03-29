require('express-async-errors');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const app = express();
const notFoundError = require('./middlewares/notFoundError');
const {errorHandler} = require('./middlewares');
const router = require('./routes');

app.use(cookieParser());
app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.static('protected'));
app.use(router);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', '404.html'));
});
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;

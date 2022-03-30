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
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'protected')));
app.use(router);

app.use(notFoundError);

app.use(errorHandler);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', '404.html'));
});
module.exports = app;

const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorManager = require('./middlewares/errorManager');
const routers = require('./routers');

const app = express();

app.use(cors(
  { 
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  },
));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(routers);
app.use(errorManager);

module.exports = app;

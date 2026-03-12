const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API Running...');
});

const routes = require('./routes');

app.use('/api/v1', routes);

const { protect } = require('./middlewares/auth.middleware');

app.get('/api/v1/protected', protect, (req, res) => {
  res.json({
    message: 'Protected route working',
    user: req.user,
  });
});

app.use(errorMiddleware);

module.exports = app;

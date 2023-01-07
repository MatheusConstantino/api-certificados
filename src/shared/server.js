require('express-async-errors');

require('dotenv/config');

const express = require('express');

const cors = require('cors');

const AppError = require('./errors/AppError');

const routes = require('./routes');

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

app.use(
  (error, request, response, next) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

app.listen(80, () => {
  console.log('Server started on port 80');
});
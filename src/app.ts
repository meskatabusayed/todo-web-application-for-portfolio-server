/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notfound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//application router
app.use('/api/v1', router);


app.get('/', (req, res) => {
  res.send('Hello World! from todo');
});

//Not Found Route
app.use(notFound);

//Global Error handler
app.use(globalErrorHandler);

export default app;

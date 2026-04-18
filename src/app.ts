/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import cors from 'cors';
import express from 'express';
import { todoRouters } from './app/modules/todo/todo.route';
import { userRouter } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import notFound from './app/middlewares/notfound';
import router from './app/routes';
const app = express();

//parser
app.use(express.json());
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

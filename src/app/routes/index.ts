/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import { Router } from "express";
import { todoRouters } from "../modules/todo/todo.route";
import { userRouter } from "../modules/user/user.route";
import { authRouter } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/todos',
    route: todoRouters,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
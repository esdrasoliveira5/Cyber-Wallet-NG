import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import App from './app';
import UserController from './controllers/UserController';
import UserModel from './Models/UserModel';
import UserRouter from './Routes/UserRouter';
import UserService from './Services/UserService';

const server = new App();
const router = Router();
const prisma = new PrismaClient();

const userModel = new UserModel(prisma);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userRouter = new UserRouter(router);

userRouter.addRoute(userController);
server.addRouter(userRouter.router);

export default server;
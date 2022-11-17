import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import App from './app';
import TransactionController from './controllers/TransactionController';
import UserController from './controllers/UserController';
import TransactionModel from './Models/TransactionModel';
import UserModel from './Models/UserModel';
import TransactionRouter from './Routes/TransactionRouter';
import UserRouter from './Routes/UserRouter';
import TransactionService from './Services/TransactionService';
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

const transactionModel = new TransactionModel(prisma);
const transactionService = new TransactionService(transactionModel);
const transactionController = new TransactionController(transactionService);
const transactionRouter = new TransactionRouter(router);

transactionRouter.addRoute(transactionController);
server.addRouter(transactionRouter.router);

export default server;
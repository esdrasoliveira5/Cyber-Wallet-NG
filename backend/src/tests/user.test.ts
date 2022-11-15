import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { PrismaClient } from '@prisma/client';
import UserModel from '../Models/UserModel';
import App from '../app';
import UserService from '../Services/UserService';
import UserController from '../controllers/UserController';
import { Router } from 'express';
import CustomRouter from '../Routes/router';

const router = Router();
const server = new App();
const prisma = new PrismaClient();
const userModel = new UserModel(prisma);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userRouter = new CustomRouter(router);
userRouter.addRoute(userController);
server.addRouter(userRouter.router);

chai.use(chaiHttp);
const { expect } = chai;

const payload = {
  id: "730d32da-6e30-40e5-b339-8050293f7ac1",
  username: "esdrasx1",
  password: "$2b$10$DmTUFuzXo29hXx7d.o7XS.hQgVx0J0o1VirwGhY4j4Y/RkW5T177K",
  accountId: "629a94e4-9c37-440d-a90d-6a7b3b7d7c75"
}

describe('1 - Test endpoint POST /user', () => {
  describe('1.1 - if success', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getOne')
      .resolves(null);
      sinon
      .stub(userModel, 'create')
      .resolves(payload);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 201 and the user created', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "teste",
          "password": "AaaaBbbb1",
      });

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.deep.equal({
        "id": "730d32da-6e30-40e5-b339-8050293f7ac1",
        "username": "esdrasx1",
        "password": "$2b$10$DmTUFuzXo29hXx7d.o7XS.hQgVx0J0o1VirwGhY4j4Y/RkW5T177K",
        "accountId": "629a94e4-9c37-440d-a90d-6a7b3b7d7c75"
      });
    });
  });

  describe('1.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getOne')
      .onFirstCall()
      .rejects({ error: 'Internal Server Error'})
      .onSecondCall()
      .resolves(payload);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 400 and the error message "Invalid Username"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "a",
          "password": "AaaaBbbb1",
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Invalid Username"});
    });
    
    it('b) return status 400 and the error message "Invalid Password"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "esdreas",
          "password": "a",
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Invalid Password"});
    });

    it('c) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "esdrasd",
          "password": "AaaaBbbb1",
      });

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Internal Server Error"});
    });

    it('d) return status 400 and the error message "Invalid Username"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/user')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "esdre",
          "password": "AaaaBbbb1",
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Invalid Username"});
    });
  });
});
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
import UserRouter from '../Routes/UserRouter';

const router = Router();
const server = new App();
const prisma = new PrismaClient();
const userModel = new UserModel(prisma);
const userService = new UserService(userModel);
const userController = new UserController(userService);
const userRouter = new UserRouter(router);
userRouter.addRoute(userController);
server.addRouter(userRouter.router);

chai.use(chaiHttp);
const { expect } = chai;

const USER_PAYLOAD = {
  id: 1,
  username: "esdrasx1",
  accountId: 1
};

const LOGIN_PAYLOAD = {
  user: {
      id: 1,
      username: "esdrea12s",
      accountId: 1
  },
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwNjIwNTRlLTY3ZDUtNGY2Ni04YzMzLTMwNzFiOTIzYmI2NiIsInVzZXJuYW1lIjoiZXNkcmVhMTJzIiwiaWF0IjoxNjY4NjI3MjQxLCJleHAiOjE2Njg3MTM2NDF9.OJVbBitrrLMzw98jp6sXE9Ehht5rqvHz6KsRPxdAyjo"
};

const USER_ACCOUNT_PAYLOAD = {
  id: 1,
  username: "esdrea12s",
  account: {
      id: 1,
      balance: 100
  }
};

describe('1 - Test endpoint POST /user', () => {
  describe('1.1 - if success', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getOne')
      .resolves(null);
      sinon
      .stub(userModel, 'create')
      .resolves(USER_PAYLOAD);
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
        id: 1,
        username: "esdrasx1",
        accountId: 1
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
      .resolves(USER_PAYLOAD);
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

describe('2 - Test endpoint POST /login', () => {
  describe('2.1 - if success', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getAccount')
      .resolves({  
        id: 1,
        username: "esdrasx1",
        password: "$2b$10$DmTUFuzXo29hXx7d.o7XS.hQgVx0J0o1VirwGhY4j4Y/RkW5T177K",
        accountId: 1
      });
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 200 and the user with token', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/login')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "esdrea12s",
          "password": "AaaaBbbb1",
      });

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.user).to.deep.equal({
        "id": 1,
        "username": "esdrasx1",
        "accountId": 1
      });
    });
  });

  describe('2.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getAccount')
      .onFirstCall()
      .rejects({ error: 'Internal Server Error'})
      .onSecondCall()
      .resolves(null);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/login')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "esdrasd",
          "password": "AaaaBbbb1",
      });

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Internal Server Error"});
    });

    it('b) return status 400 and the error message "Invalid Username" if invalid username', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/login')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "as",
          "password": "AaaaBbbb1",
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Invalid Username"});
    });

    it('c) return status 400 and the error message "Invalid Password" if invalid password', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/login')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "esdrasd",
          "password": "zaasddsda",
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Invalid Password"});
    });


    it('c) return status 400 and the error message "Unauthorized" if invalid password or username', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/login')
         .set('X-API-Key', 'foobar')
         .send({
          "username": "esdrasnever",
          "password": "AaaaBbbb2",
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Unauthorized"});
    });
  });
});

describe('3 - Test endpoint GET /user/:username', () => {
  describe('3.1 - if success', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getOne')
      .resolves(USER_PAYLOAD)
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 200 and the user', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/esdrasx1')
         .set('X-API-Key', 'foobar')
         .set('authorization', LOGIN_PAYLOAD.token)

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        id: 1,
        username: "esdrasx1",
        accountId: 1
      });
    });
  });

  describe('3.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getOne')
      .onFirstCall()
      .rejects({ error: 'Internal Server Error'})
      .onSecondCall()
      .resolves(null);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/esdrasx1')
         .set('X-API-Key', 'foobar')
         .set('authorization', LOGIN_PAYLOAD.token);

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Internal Server Error"});
    });

    it('b) return status 401 and the error message "Unauthorized" if Authorization token is invalid', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/esdrasx1')
         .set('X-API-Key', 'foobar');

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Unauthorized"});
    });

    it('c) return status 404 and the error message "Not Found"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/esdrasx1')
         .set('X-API-Key', 'foobar')
         .set('authorization', LOGIN_PAYLOAD.token);

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Not Found"});
    });
  });
});

describe('4 - Test endpoint GET /user/account', () => {
  describe('4.1 - if success', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getAccount')
      .resolves(USER_ACCOUNT_PAYLOAD);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 200 and the user with account', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/account')
         .set('X-API-Key', 'foobar')
         .set('authorization', LOGIN_PAYLOAD.token)

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        id: 1,
        username: "esdrea12s",
        account: {
            id: 1,
            balance: 100
        }
      });
    });
  });

  describe('4.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(userModel, 'getAccount')
      .onFirstCall()
      .rejects({ error: 'Internal Server Error'})
      .onSecondCall()
      .resolves(null);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/account')
         .set('X-API-Key', 'foobar')
         .set('authorization', LOGIN_PAYLOAD.token);

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Internal Server Error"});
    });

    it('b) return status 401 and the error message "Unauthorized" if Authorization token is invalid', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/account')
         .set('X-API-Key', 'foobar');

      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Unauthorized"});
    });

    it('c) return status 404 and the error message "Not Found"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .get('/user/account')
         .set('X-API-Key', 'foobar')
         .set('authorization', LOGIN_PAYLOAD.token);

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Not Found"});
    });
  });
});

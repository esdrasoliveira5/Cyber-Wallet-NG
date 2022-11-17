import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
import { PrismaClient } from '@prisma/client';
import App from '../app';
import { Router } from 'express';
import TransactionModel from '../Models/TransactionModel';
import TransactionService from '../Services/TransactionService';
import TransactionController from '../controllers/TransactionController';
import TransactionRouter from '../Routes/TransactionRouter';

const router = Router();
const server = new App();
const prisma = new PrismaClient();
const transactionModel = new TransactionModel(prisma);
const transactionService = new TransactionService(transactionModel);
const transactionController = new TransactionController(transactionService);
const transactionRouter = new TransactionRouter(router);
transactionRouter.addRoute(transactionController);
server.addRouter(transactionRouter.router);

chai.use(chaiHttp);
const { expect } = chai;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlc2RyYXN0ZXN0ZTEiLCJpYXQiOjE2Njg3MTM1NzEsImV4cCI6MTcxMTkxMzU3MX0.w9A5E_iFLPMxcW5KoCEQsrW0XdY4OI1i3PLIZ3mAhSY"


const TRANSACTION_PAYLOAD = {
    id: 1,
    value: 50,
    createdAt: new Date("2022-11-17T18:23:24.116Z"),
    debitedAccountId: 1,
    creditedAccountId: 2
}

const USER_PAYLOAD = {
  id: 1,
  username: "esdrasx1",
  password: "password",
  accountId: 1
};


describe('1 - Test endpoint POST /transaction', () => {
  describe('1.1 - if success', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(transactionModel, 'getAccount')
      .resolves(USER_PAYLOAD);
      sinon
      .stub(transactionModel, 'create')
      .resolves(TRANSACTION_PAYLOAD);
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 201 and the transaction created', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/transaction')
         .set('X-API-Key', 'foobar')
         .set('authorization', TOKEN)
         .send({
          "value": 50,
          "creditedAccountId": 2
      });

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.deep.equal({
        id: 1,
        value: 50,
        createdAt: "2022-11-17T18:23:24.116Z",
        debitedAccountId: 1,
        creditedAccountId: 2
      });
    });
  });

  describe('1.2 - if fail', () => {
    let chaiHttpResponse: Response;
    before(() => {
      sinon
      .stub(transactionModel, 'getAccount')
      .onFirstCall()
      .resolves(null)
      .onSecondCall()
      .resolves(USER_PAYLOAD);
      sinon
      .stub(transactionModel, 'create')
      .rejects({ error: 'Internal Server Error'})
    });
    after(()=>{
      sinon.restore();
    });

    it('a) return status 401 and the error message "Unauthorized" if Authorization token is invalid', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/transaction')
         .set('X-API-Key', 'foobar')
         .set('authorization', '')
         .send({
          "value": 50,
          "creditedAccountId": 2
      });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Unauthorized"});
    });

    it('b) return status 400 and the error message "Bad Request" if value is invalid', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/transaction')
         .set('X-API-Key', 'foobar')
         .set('authorization', TOKEN)
         .send({
          "value": -100,
          "creditedAccountId": 2
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Bad Request"});
    });

    it('c) return status 400 and the error message "Bad Request" if creditedAccountId is invalid', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/transaction')
         .set('X-API-Key', 'foobar')
         .set('authorization', TOKEN)
         .send({
          "value": 100,
          "creditedAccountId": "user123"
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Bad Request"});
    });

    it('d) return status 400 and the error message "Bad Request" if creditedAccountId not exist', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/transaction')
         .set('X-API-Key', 'foobar')
         .set('authorization', TOKEN)
         .send({
          "value": 100,
          "creditedAccountId": 50
      });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Bad Request"});
    });
    it('e) return status 500 and the error message "Internal Server Error"', async () => {
      chaiHttpResponse = await chai
         .request(server.app)
         .post('/transaction')
         .set('X-API-Key', 'foobar')
         .set('authorization', TOKEN)
         .send({
          "value": 100,
          "creditedAccountId": 50
      });
      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body).to.deep.equal({ "error": "Internal Server Error"});
    });
  });
});
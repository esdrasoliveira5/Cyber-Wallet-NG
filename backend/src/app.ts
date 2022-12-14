import express, { Router, Request, Response } from 'express';
import Cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import HandleError from './middlewares/HandleError';

import swaggerDocument from './swagger.json';

require('express-async-errors');

class App {
  public app: express.Application;

  public handleError = new HandleError();

  constructor() {
    this.app = express();
    this.app.use(Cors());
    this.app.use(express.json());
    this.app.get('/', async (_req: Request, resp: Response) => {
      resp.status(200).json({
        message: 'API ONLINE!!',
      });
    });
    this.app.use(
      '/api-docs', 
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  public startServer(PORT: string | number = 3001): void {
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
    this.app.use(this.handleError.genericError);
  }

  public getApp() {
    return this.app;
  }
}

export default App;

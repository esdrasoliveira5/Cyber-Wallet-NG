import express, { Router, Request, Response } from 'express';

require('express-async-errors');

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.get('/', async (_req: Request, resp: Response) => resp.status(200).json({
      message: 'API OLINE!!',
    }));
  }

  public startServer(PORT: string | number = 3001): void {
    this.app.listen(
      PORT,
      () => console.log(`Server running here 👉 http://localhost:${PORT}`),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public getApp() {
    return this.app;
  }
}

export default App;

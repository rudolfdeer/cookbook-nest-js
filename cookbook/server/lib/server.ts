export {};

const { App } = require('./api/app');

class Server {
  app: typeof App;

  constructor() {
    this.app = new App();
  }

  start() {
    this.app.connectCors();
    this.app.connectDb();
    this.app.connectMiddlewares();
    this.app.connectRoutes();
    this.app.listen();
  }
}

module.exports = {
  Server,
};

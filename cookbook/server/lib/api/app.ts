import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { serverConfig } from '../constants/configs/server.configs';
import { db } from './data-access';

const path = require('path');
const { router } = require('./routes');
const { middlewares } = require('../middlewares');

export class App {
  client: express.Application;

  constructor() {
    this.client = express();
  }

  connectCors() {
    this.client.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
  }

  async connectDb() {
    try {
      await db.authenticate();
      console.log('connected to db');
    } catch (err) {
      console.error(`db connection error: ${err}`);
    }
  }

  connectMiddlewares() {
    this.client.use(express.json({ limit: '50mb' }));
    this.client.use(express.urlencoded({ limit: '50mb', extended: true }));
    this.client.use('/', express.static(path.join(__dirname, '../../public')));
    this.client.use(cookieParser());
    this.client.use(middlewares.bodyParser());
  }

  connectRoutes() {
    this.client.use(router);
  }

  async listen() {
    try {
      await db.sync();
      this.client.listen(serverConfig.port, () => console.log(`server started at: http://localhost:${serverConfig.port}`));
    } catch (err) {
      console.log(`server error: ${err}`);
    }
  }
}

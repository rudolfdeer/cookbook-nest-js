import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/config/config.json`)[env];

const db = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, db };

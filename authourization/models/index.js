const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const pg = require('pg');
config.dialectModule = pg;

// Load environment variables
require('dotenv').config();

let sequelize;
if (config.connectionString) {
  sequelize = new Sequelize(process.env[config.connectionString], config);
} else {
  sequelize = new Sequelize({
    dialect: 'postgres',
    dialectModule: pg,
    host: process.env.DB_HOST || config.host,
    port: 5432,
    username: process.env.DB_USER || config.username,
    password: process.env.DB_PASSWORD || config.password,
    database: process.env.DB_NAME || config.database,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'moses',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'authourization',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    connectionString: process.env.POSTGRES_URL,
    dialect: 'postgres',
    dialectModule: require('pg'),
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};


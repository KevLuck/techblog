const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

const connectToDatabase = (url, dbName, dbUser, dbPassword, config) => {
  try {
    sequelize = new Sequelize(url || dbName, dbUser, dbPassword, config);
    console.log('Successfully connected to the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

if (process.env.JAWSDB_URL) {
  connectToDatabase(process.env.JAWSDB_URL);
} else {
  connectToDatabase(
    null,
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;

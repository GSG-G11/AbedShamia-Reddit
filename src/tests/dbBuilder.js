require('dotenv').config();
const fs = require('fs');
const connection = require('../database/config/connection');

const sqlFile = fs.readFileSync('./src/database/config/build.sql', 'utf8');

const dbBuild = () => {
  connection.query(sqlFile, (err, res) => {
    if (err) {
      console.log('Error creating tables: ', err);
    }
  });
};

module.exports = dbBuild;

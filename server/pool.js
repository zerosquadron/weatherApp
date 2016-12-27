/*eslint no-console: ['error', { allow: ['log', 'info', 'error'] }] */
'use strict';
const mysql = require('mysql');

function Pool() {
  this.pool = null;
  this.init = () => {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      user: 'root',
      host: process.env.HOST,
      password: process.env.PASSWORD,
      port: process.env.PORT,
    });
  };

  this.acquire = (callback) => {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.log(`[${new Date()}] ERROR: ${err}`);
        throw err;
      }
      callback(err, connection);
    });
  };
}

module.exports = new Pool();

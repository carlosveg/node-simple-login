const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./dbConfig');

const dbConn = mysql.createPool(database);

dbConn.getConnection((err, conn) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Conexión con la BD perdida.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Muchas conexiones a la BD.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Conexión con la BD rechazada.');
        }
    }

    if (conn) {
        conn.release();
    }
    console.log('Conexión exitosa');

    return;
});

dbConn.query = promisify(dbConn.query);

module.exports = dbConn;
const mysql = require('mysql2');

//connect our app to mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your mysql username
        user: 'root',
        // Your mySQL password
        password: 'PhuongHoang68',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;
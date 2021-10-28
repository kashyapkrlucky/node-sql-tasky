const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lucky@9sql',
    database: 'tasky'
});

connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Db connected');
    }
});

module.exports = connection;
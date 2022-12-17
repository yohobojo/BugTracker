const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'yohoDB123!',
  database: 'bugs',
});

connection.connect();

connection.query('SELECT * FROM bugs', (err, rows, fields) => {
  if (err) throw err;

  console.log(rows);
});

connection.end();

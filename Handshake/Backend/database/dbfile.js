const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'deep',
  password: 'ubuntu8233',
  database: 'handshake',
  connectionLimit: 100, //mysql pool length
});

connection.getConnection((err) => {
  if (err){
    throw err;
  }
});

// local mysql db connection
/*
 const connection = mysql.createConnection({
   host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com',
   port: '3306',
   user: 'deep',
   password: 'ubuntu8233',
   database: 'handshake',
 });
*/
/* connection.getConnection((err) => {
  if (err){
    throw err;
  } 
});
*/
module.exports = connection;

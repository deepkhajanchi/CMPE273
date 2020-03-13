var express = require("express");
var app = express.Router();
var cors= require('cors');
var jwt= require('jsonwebtoken');
var bcrypt= require('bcrypt');

const connection= require("../../config/database");
app.use(cors());

app.post("/student_register",async(req,res)=>{
    console.log("Request to login as:", req.body);
    async function student_register(){
        const mysql= require('mysql2/promise');
        //var row;
        const connection= await mysql.createConnection(
            {
                host:'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com',
                user:'deep',
                password:'ubuntu8233',
                database:'handshake'
            }
        );
        
        var statement='INSERT INTO student (firstname, lastname, email, password, school) VALUES(?,?,?,?,?)';
        //const[r, fields]= await conn. execute('SELECT * FROM student WHERE email=?', [req.body.email]);
        var newdata=[req.body.firstname, req.body.lastname, req.body.email, req.body.password, req.body.school];
        await connection.query(statement, newdata, (err, results, fields)=>{
            if(err){
                console.log('Insertion error'+err.message);
                return console.error(err.message);
            }
            console.log('student ID:'+results.insertId);
            res.cookie('cookie',req.body.email,{
                maxAge:1000000,
                httpOnly: false,
                path:'/'
            });
            return results;
        });
        await connection.end();
        console.log("after insertion");
    }
    let data=createStudent().
    then(r=>res.send(r)).catch(e=>e.message);
});

module.exports= app;
var express = require("express");
var app = express.Router();
var cors= require('cors');
var bodyParser = require('body-parser');
var jwt= require('jsonwebtoken');
var bcrypt= require('bcrypt');

const database= require("../../config/database").default;
app.use(cors());
app.use(bodyParser.json());

app.post("/student_login",async(req,res)=>{
    console.log("Request to login as:", req.body);
    async function student_login(){
        const mysql= require('mysql2/promise');
        var row;
        const conn= await mysql.createConnection(
            {
                host:'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com',
                user:'deep',
                password:'ubuntu8233',
                database:'handshake'
            }
        );
        const[r, fields]= await conn. execute('SELECT * FROM student WHERE email=?', [req.body.email]);
        row=r;    
        console.log("Response for login as:",row);
        await conn.end();
        console.log("Passwords are being validated...");
        if(row[0].password == req.body.password){
            res.cookie('cookie',req.body.email,
            {
                maxAge:1000000,
                httpOnly:false,
                path:'/'
            });
            req.session.user= req.body.email;
            return row[0];
        }else{
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.end("SignIn failed!!");
        }
    }
    let data= student_login();
    data.then(r=>{
        console.log(r);
        res.setHeader('Content-Type','text/html');
        res.send(r);
    })
    .catch(e=> e.message);
});

module.exports= app;

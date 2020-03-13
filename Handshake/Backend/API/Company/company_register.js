var express= require('express');
var app = express.Router();
var cors= require('cors');
var jwt= require('jsonwebtoken');
var bcrypt= require('bcrypt');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post('/company_register',async (req,res)=>{
    async function company_register(){
        const mysql= require('mysql2/promise');
        const conn= await mysql.createConnection(
            {
                host:'',
                user:'deep',
                password:'ubuntu8233',
                database:'handshake'
            }
        );
        const[error,results]= await conn.query('INSERT into company (name, email, password, location) VALUES (?, ?, ?, ?)',[req.body.name, req.body.email, req.body.password, req.body.location]);
        await conn.end();
        if(error){
            console.log("error");
            return error;
        }else{
            return results;
        }
    };
    let data= company_register()
    .then(r=> res.send(r)).catch(e=>e.message)
});

module.exports=app;
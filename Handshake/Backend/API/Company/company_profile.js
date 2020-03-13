var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/getCompanyDetails', async function (req, res) {

    async function getCompanyDetails() {
        console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );
        // const [rows, fields] = await conn.query('SELECT * FROM `company` WHERE id_company=?', [req.body.id]);
        const [rows, fields] = await conn.query('Select * from company where id_company = ?', req.body.id);
        console.log("after", rows[0]);
        await conn.end();

        return rows[0];
    }
    let data = getCompanyDetails().then(r => res.send(r)).catch(e => e.message)
});



app.post('/updateCompanyDetails', async function (req, res) {

    async function updateCompanyDetails(err) {
        console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );
        const [error, results] = await conn.query('UPDATE company SET phone_number = ?, city= ?, state = ? , country = ?, description= ? where id_company = ?', [req.body.phoneNumber, req.body.city, req.body.state, req.body.country, req.body.description, req.body.id_company]);
        var re = results;
        var er = error;
        console.log("updateCompanyDetails =>  ", error);
        console.log("updateCompanyDetails => result", re);
        await conn.end();
        // return Object.assign({}, rows);
        if (error) {
            console.log("error");
            return error;
        }
        else {
            results.status(200);
            return results;
        }
    }

    let data = updateCompanyDetails().then(r => {
        console.log("viewing it: ", r);
        res.sendStatus(200)
    }).catch(e => e.message)
});
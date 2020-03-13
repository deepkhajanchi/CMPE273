var express = require("express");
var app = express.Router();
var bodyParser=require('body-parser');

app.use(bodyParser.json());

app.post('/upload', (req, res, next) => {
    console.log(`uploadFile -> ${req.body.filename}`);
    let imageFile = req.files.file;
    console.log(`uploadFile -> ${__dirname}/public/${req.body.filename}`)
    imageFile.mv(
        `${__dirname}/files/${req.body.filename}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ file: `public/${req.body.filename}` });
    });
})

app.post('/saveBasicDetails', async function (req, res) {
    async function saveBasicStudentDetails(err) {
        //console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            {
                 host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                 user: 'deep', 
                 password: 'ubuntu8233', 
                 database: 'handshake'
                 }
        );

        const [error, results] = await conn.query('UPDATE `student` SET date_of_birth = ?, city= ?, state = ? , country = ?, career_objective= ? where id_student = ?', [req.body.dob, req.body.city, req.body.state, req.body.country, req.body.careerObjective, req.body.id_student]);
        //console.log("after");
        await conn.end();
        // return Object.assign({}, rows);
        if (error instanceof multer.MulterError) {
            console.log("error");
            return results.status(500).json(error);
        } else if (error) {
            return results.status(500).json(error);
        }
        else {
            results.status(200).send(req.file)
            return results;
        }
    }
    let data = saveBasicStudentDetails().then(r => console.log(r)).catch(e => e.message)
});


app.post('/getBasicDetails', async function (req, res) {

    async function getBasicStudentDetails() {
        //console.log("Inside getBasic Details of student.js", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );
        //console.log("Connection has been succesfully created!");
        const [rows, fields] = await conn.query('Select * from student where id_student = ?', [req.body.id]);
        // console.log("basic Details : ", rows);
        await conn.end();
        return rows[0];
    }
    let data = getBasicStudentDetails();
    data.then(r => res.send(r)).catch(e => e.message)
});

app.post('/searchStudents', async function (req, res) {

    async function getStudentsForSearch() {
        var first = true;

        console.log("[BE] - searchStudents -> ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            {
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com',
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
        );
        //console.log("Connection has been successfully created!");
        var sql_query = "SELECT * FROM student s INNER JOIN student_education_details sed ON s.id_student = sed.id_student ";

        if (req.body.student_name.length != 0) {
            if (first)
                sql_query += "WHERE"
            sql_query += "  s.first_name LIKE '%" + req.body.student_name + "%'";
            first = false;
        }

        if (req.body.student_school.length != 0) {
            if (first)
                sql_query += "WHERE"
            else {
                sql_query += " AND";
            }
            sql_query += " sed.college_name LIKE '%" + req.body.student_school + "%'";
            first = false;
        }

        if (req.body.student_major.length != 0) {
            if (first)
                sql_query += "WHERE"
            else {
                sql_query += " AND";
            }
            sql_query += " sed.major LIKE '%" + req.body.student_major + "%'";
        }

        console.log("searchStudents -> sql: ", sql_query);
        const [rows, fields] = await conn.query(sql_query);
        console.log("searchStudents -> response from DB: ", rows);
        await conn.end();
        return rows;
    }
    let data = getStudentsForSearch();
    data.then(r => res.send(r)).catch(e => e.message)
});

app.post('/saveContactDetails', async function (req, res) {

    async function saveContactDetails() {
        //console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            {
                 host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                 user: 'deep', 
                 password: 'ubuntu8233', 
                 database: 'handshake' 
                }
                );
        //console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('UPDATE student SET email_id = ?, phone_number= ? where id_student = ?', [req.body.emailId, req.body.phoneNumber, req.body.id]);
        //console.log("after");
        await conn.end();
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveContactDetails().then(r => console.log(r)).catch(e => e.message)
});


app.post('/getContactDetails', async function (req, res) {

    async function getContactDetails() {
        //console.log("Inside get Contact Details ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );

        const [rows, fields] = await conn.query('Select phone_number, email_id from student where id_student = ?', [req.body.id]);
        //console.log("after", rows[0]);
        await conn.end();
        //console.log("Contact details: ", rows[0]);

        return (rows[0]);
    }
    let data = getContactDetails();
    data.then(r => {
        //console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});

app.post('/saveEducationDetails', async function (req, res) {

    async function saveEducationDetails() {
        //console.log(req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );
        //console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('INSERT INTO `student_education_details` ( college_name, degree, major, yop, cgpa, id_student) VALUES (?,?,?,?,?,?)', [req.body.collegeName, req.body.degree, req.body.major, req.body.yop, req.body.cgpa, req.body.id]);
        //console.log("after");
        await conn.end();
        // return Object.assign({}, rows);
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveEducationDetails().then(r => console.log(r)).catch(e => e.message)
});

app.post('/getEducationDetails', async function (req, res) {

    async function getEducationDetails() {
        //console.log("Inside get Education ",req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );
        //xconsole.log("Connecttion has been succesfully created!");
        const [rows, fields] = await conn.query('Select * from student_education_details where id_student = ?', [req.body.id]);
        console.log("after", rows[0]);
        await conn.end();
        // return Object.assign({}, rows);
        //console.log("Education details: ", rows[0]);

        return (rows[0]);
    }
    let data = getEducationDetails();
    data.then(r => {
        console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});

app.post('/saveExperienceDetails', async function (req, res) {

    async function saveExperienceDetails() {
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
        console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('INSERT INTO `student_experience_details` ( fk_student_id, company_name, jobTitle, city, country, start_date, end_date, work_description) VALUES (?,?,?,?,?,?,?,?)', [req.body.id, req.body.companyName, req.body.jobTitle, req.body.city, req.body.country, req.body.startDate, req.body.endDate, req.body.workDesc]);
        console.log("after", results);
        await conn.end();
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveExperienceDetails().then(r => console.log(r)).catch(e => e.message)
});


app.post('/getExperienceDetails', async function (req, res) {

    async function getExperienceDetails() {
        console.log("Inside get Experience Details ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );

        const [rows, fields] = await conn.query('Select * from student_experience_details where fk_student_id = ?', [req.body.id]);
        //console.log("after", rows[0]);
        await conn.end();
        console.log("Experience details: ", rows[0]);

        return (rows[0]);
    }
    let data = getExperienceDetails();
    data.then(r => {
        console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});

app.post('/saveSkills', async function (req, res) {

    async function saveSkills() {
        // console.log("saveSkills => ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );
        //console.log("Connection has been successfully created!");
        const [error, results] = await conn.query('INSERT INTO `student_skillset` (skill_name, fk_student_num) VALUES(?, ?)', [req.body.skill, req.body.id]);

        await conn.end();
        if (error) {
            console.log("error");
            return error;
        }
        else {
            return results;
        }
    }
    let data = saveSkills().then(r => console.log("saveSkills =>", r)).catch(e => e.message)
});


app.post('/getSkills', async function (req, res) {

    async function getSkills() {
        console.log("GETSkills => ", req.body);
        const mysql = require('mysql2/promise');
        const conn = await mysql.createConnection(
            { 
                host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com', 
                user: 'deep', 
                password: 'ubuntu8233', 
                database: 'handshake' 
            }
            );

        const [rows, fields] = await conn.query('Select * from student_skillset where fk_student_num = ?', [req.body.id]);
        console.log("GETSkills => after", rows);
        await conn.end();
        console.log("GETSkills => Skills: ", rows);

        return (rows);
    }
    let data = getSkills();
    data.then(r => {
        console.log(r);
        res.send(r)
    })
        .catch(e => e.message)
});

app.post('/upload',(req,res,next)=>{
    console.log(`uploadFile -> ${req.body.filename}`);
    let imageFile = req.files.file;
    console.log(`uploadFile -> ${__dirname}/public/${req.body.filename}`)
    imageFile.mv(`${__dirname}/files/${req.body.filename}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ file: `public/${req.body.filename}` });
    });
});


module.exports = app;
const express = require('express');
const createError = require('createerror');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require("path")
const mysql = require('mysql');
require("dotenv").config()

const mc = mysql.createPool({
  host: 'handshake.c6hvi6xe5u7n.us-east-1.rds.amazonaws.com',
  port: '3306',
  user: 'deep',
  password: 'ubuntu8233',
  database: 'handshake',
  connectionLimit: 100, //mysql pool length
});

mc.getConnection((err) => {
  if (err) {
    throw err;
  }
});

// Express Routes
const studentRoute = require('./routes/studentroute');
const companyRoute = require('./routes/companyroute');
const jobRoute = require('./routes/jobroute');
const applicationRoute = require('./routes/applicationroute');
const eventRoute = require('./routes/eventroute');
const uploadRoute= require('./routes/student_upload')
const comp_uploadRoute= require('./routes/company_upload')

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'cmpe_273_secure_string',
  resave: true,
  saveUninitialized: true,
}));

app.use(cors());

app.use('/students', studentRoute);
app.use('/companies', companyRoute);
app.use('/jobs', jobRoute);
app.use('/applications', applicationRoute);
app.use('/events', eventRoute);
app.use('/student_upload',uploadRoute);
app.use('/company_upload',comp_uploadRoute);

app.use(express.static(path.join(__dirname, "client", "build")))

// PORT
const port = process.env.PORT || 4000;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

// 404 
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

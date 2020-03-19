const express = require('express');
const router = express.Router();
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles');
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5 },
});
const moment = require('moment');
const fs = require('fs');
const sql = require('../database/dbfile');

router.route('/getapplicantions').post((req, res) => {
  console.log(req.body);
  sql.query('SELECT students.name, students.id, applications.resFile, applications.status, applications.id AS appID FROM applications, jobs, students WHERE jobs.id = ? AND applications.job = jobs.id AND applications.student = students.id',
    [req.body.id], (error, applicants) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log('Applicants : ', JSON.stringify(applicants));
        res.end(JSON.stringify(applicants));
      }
    });
});

router.route('/updateApplication').post((req, res) => {
  console.log(req.body);
  sql.query('UPDATE applications SET status = ? WHERE id = ?',
    [req.body.status, req.body.id], (error, application) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        console.log(application);

        res.end('Success');
      }
    });
});

router.route('/jobApply').post((req) => {
  console.log('in job apply');
  console.log(req.body.id);
  session.jobID = req.body.id;
});module.exports = router;

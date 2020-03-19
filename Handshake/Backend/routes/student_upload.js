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

router.route('/resume').post(upload.array('resume', 5), (req, res, next) => {
    console.log(req.files);
    const resume = req.files.map((file) => {
      console.log('in resume');
      console.log(session.jobID);
      return {
        resFile: file.filename,
        resOG: file.originalname,
        job: session.jobID,
        student: session.user.id,
        status: 'Pending',
        created: moment(Date.now()).format('YYYY-MM-DD'),
      };
    });
    console.log(resume);
    if (!resume[0].resOG.match(/\.(pdf)$/i)) {
      res.json('Not a PDF');
    } else {
      sql.query('INSERT INTO applications SET ?',
        resume[0], (error) => {
          if (error) {
            console.log(error);
            console.log('hello2');
            return next(error);
          }
          res.json('Resume uploaded successfully !');
          return 0;
        });
    }
  });
  
  router.route('/getResume/:resFile').get((req, res) => {
    console.log(UPLOAD_PATH);
    fs.createReadStream(path.resolve(UPLOAD_PATH, req.params.resFile)).pipe(res);
  });
  
  module.exports = router;
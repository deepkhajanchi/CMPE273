const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const BCRYPT_SALT_ROUNDS = 12;
const multer = require('multer');
const path = require('path');
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles');
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { files: 5 },
});

const fs = require('fs');
const sql = require('../database/dbfile');

router.route('/profPic').post(upload.array('image', 5), (req, res, next) => {
    const images = req.files.map((file) => ({
      profilePicFile: file.filename,
      profilePicOG: file.originalname,
    }));
    console.log(images);
    if (!images[0].profilePicOG.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
      res.json('Not an image');
    } else {
      console.log(session.user.email);
      sql.query('UPDATE companies SET ? WHERE email = ?',
        [images[0], session.user.email], (error) => {
          if (error) {
            console.log(error);
            console.log('hello2');
            return next(error);
          }
          sql.query('SELECT * FROM companies WHERE email = ?', [session.user.email],
            (err, user) => {
              if (err) {
                console.log(err);
              } else {
                [session.user] = user;
              }
            });
          res.json('Picture uploaded successfully !');
          return 0;
        });
    }
  });
  
  router.route('/profPic/').get((req, res) => {
    console.log(UPLOAD_PATH);
    console.log(session.user);
    if(session.user.profilePicFile != ''){
      let readStream = fs.createReadStream(path.resolve(UPLOAD_PATH, session.user.profilePicFile));
      readStream.pipe(res);
    }
  });

  module.exports=router;
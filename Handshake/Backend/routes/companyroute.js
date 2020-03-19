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
// CREATE company

router.route('/create-company').post((req, res, next) => {
  console.log('hello');
  bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
    .then((hashedPass) => {
      req.body.password = hashedPass;
      console.log(req.body);
      sql.query('INSERT INTO companies SET ?', req.body, (error, data) => {
        if (error) {
          console.log(error);
          res.json(error);
        } else {
          console.log('new sql success');
          console.log(data);
          res.json(data);
        }
      });
    })
    .catch((error) => {
      console.log('Error saving company: ');
      console.log(error);
      next();
    });
});

router.route('/user').get((req, res) => {
  // var logged = session.isCompany;
  const { user } = session;
  console.log(session.user);
  const data = {
    user,
    isCompany: session.isCompany,
  };
  res.json(data);
});

router.route('/logout').get((req, res) => {
  console.log('route hit');
  session.user = undefined;
  session.isCompany = false;
  res.json('done');
});

router.route('/login').post((req, res) => {
  sql.query('SELECT * FROM companies WHERE email = ?', [req.body.email], (error, user) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else if (user[0] == null) {
      res.json('No user with that email');
    } else {
      console.log(user);
      bcrypt.compare(req.body.password, user[0].password)
        .then((samePassword) => {
          res.cookie('cookie', 'admin', { maxAge: 900000, httpOnly: false, path: '/' });
            [session.user] = user;
            session.isCompany = true;
            const data = {
              user: user[0],
              isCompany: session.isCompany,
            };
            res.send(data);
          }
     
        );
    }
  });
});

// Update company
router.route('/update-company').put((req, res, next) => {
  sql.query('UPDATE companies SET ? WHERE email = ?',
    [req.body, session.user.email], (error, data) => {
      if (error) {
        console.log(error);
        return next(error);
      }
      res.json(data);

      console.log(data);
      sql.query('SELECT * FROM companies WHERE email = ?', [req.body.email],
        (err, user) => {
          if (err) {
            console.log(err);
          } else {
            [session.user] = user;
          }
        });
      console.log('Company updated successfully !');
      return 0;
    });
});

router.route('/getCompany/:id').get((req, res) => {
  console.log(req.params.id);
  sql.query('SELECT * FROM companies WHERE id = ?', [req.params.id], (err, company) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Company: ', JSON.stringify(company));
      res.end(JSON.stringify(company));
    }
  });
});
module.exports = router;
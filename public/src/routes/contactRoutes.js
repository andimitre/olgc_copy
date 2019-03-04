const express = require('express');
const contactRouter = express.Router();
const fs = require('fs');
const nodemailer = require('nodemailer');
const config = JSON.parse(fs.readFileSync(__dirname + '/../data/config.json', 'utf8'));
const parser = require('body-parser');

function router(title) {
  contactRouter.route('/')
    .get((req, res) => {
      res.render('contact',
      {
        title
      });
    });

  contactRouter.route('/')
  .post((req, res) => {
      const formUser = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
      }

      // send email
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.user[0].user || process.env.user,
          pass: config.user[0].pass || process.env.pass
        }
      });

      var mailOptions = {
        from: formUser.email,
        to: config.user[0].user || process.env.user,
        subject: 'Contact Form',
        text: "message: " + formUser.message + "\n" + "from: " + formUser.email
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.render('contact', {title});
        } else {
          console.log('Email sent: ' + info.response);
            res.render('form-submit', {title});
        }
        return;
      });
    });

    return contactRouter;
}

module.exports = router;

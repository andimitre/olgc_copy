const express = require('express');
const contactRouter = express.Router();
const fs = require('fs');
const nodemailer = require('nodemailer');
const events = JSON.parse(fs.readFileSync(__dirname + '/../data/events.json', 'utf8'));
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
      const user = {
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
        from: user.email,
        to: config.user[0].user,
        subject: 'Contact Form',
        text: user.message
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
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

const express = require('express');
const adminRouter = express.Router();
const fs = require('fs');
const parser = require('body-parser');

function router(title) {
  adminRouter.route('/')
    .get((req, res) => {
      res.render('admin',
      {
        title
      });
    });

  adminRouter.route('/')
    .post((req, res) => {
        const dtString = req.body.date;
        const year = dtString.split('-')[0]
        const month = dtString.split('-')[1]
        const day = dtString.split('-')[2]

        const start = new Date(req.body.date + ' ' + req.body.startTime);
        const end = new Date(req.body.date + ' ' + req.body.endTime);
        const stime = start.toLocaleString('en-US', { hour12: true }).split(',')[1].trim();
        const etime = end.toLocaleString('en-US', { hour12: true }).split(',')[1].trim();

        const ev = {
          day: day,
          month: month,
          year: year,
          weekDay: '',
          startTime: stime,
          endTime: etime,
          title: req.body.title,
          organizer: req.body.organizer,
          location: req.body.location,
          description: req.body.description
        }
        console.log(ev);
        console.log(req.body.password);

        if (process.env.admin == req.body.password) {
          events.push(ev);

          // fs.writeFile(__dirname + '/../data/events.json', JSON.stringify(events), 'utf8', function(err) {
        	// 	if (err) throw err
        	// 	console.log('complete')
        	// });
          res.redirect('/form-submit');

        } else {
          console.log("You are not authorized for this action.");
          return;
        }
      });

    return adminRouter;
}

module.exports = router;

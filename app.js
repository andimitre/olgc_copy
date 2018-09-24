const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const config = JSON.parse(fs.readFileSync(__dirname + '/public/src/data/config.json', 'utf8'));

const app = express();
const port = process.env.PORT || 5000;


// const events = JSON.parse(fs.readFileSync(__dirname + '/public/src/data/events.json', 'utf8'));
// const latest = events[events.length - 1]

// const timeToLatest = function () {
//   const now = Date.now();
//   const eventTime = Date.parse(latest.day + " " + latest.month + " " + latest.year + " " + latest.startTime);
//   const delta = Math.abs(eventTime - now) / 1000;
//   const days = Math.floor(delta / 86400);
//   const hours = Math.floor(delta / 3600) % 24;
//   const minutes = Math.floor(delta / 60) % 60;
//   const seconds = delta % 60;

//   const timeToEvent = {
//     "days": days,
//     "hours": hours,
//     "minutes": minutes,
//     "seconds": seconds
//   }
// 
// return timeToEvent;
// }

// const timeUntilEvent = timeToLatest();
const title = "Our Lady Of Good Counsel";
// const eventRouter = require(__dirname + '/public/src/routes/eventRoutes')(title, events, latest, timeUntilEvent);
const adminRouter = require(__dirname + '/public/src/routes/adminRoutes')(title);
const submitRouter = require(__dirname + '/public/src/routes/submitRouter')(title);
const aboutRouter = require(__dirname + '/public/src/routes/aboutRoutes')(title);
// const sacramentalLifeRouter = require(__dirname + '/public/src/routes/sacramentalLifeRouter')(title, latest);
const galleryRouter = require(__dirname + '/public/src/routes/galleryRoutes')(title);
const contactRouter = require(__dirname + '/public/src/routes/contactRoutes')(title);
const registrationRouter = require(__dirname + '/public/src/routes/registrationRoutes')(title);

app.use(fileUpload());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.set('views', __dirname + '/public/' + '/src/views');
app.set('view engine', 'ejs');


// routing
// app.use('/events', eventRouter);
app.use('/about', aboutRouter);
// app.use('/sacramental-life', sacramentalLifeRouter);
app.use('/gallery', galleryRouter);
app.use('/contact', contactRouter);
app.use('/admin', adminRouter);
app.use('/form-submit', submitRouter);
app.use('/registration', registrationRouter);

// routes
app.get('/', (req, res) => {
  res.render('about', {title});
});

app.post('/upload', function(req, res) {

  if (config.user[0].admin == req.body.password) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.sampleFile;
    sampleFile.mv(__dirname + '/public/bulletin.pdf', function(err) {
      if (err)
        console.log('error in function xyz:', err, 'whilst doing abc');
      res.redirect('/form-submit');
    });
  } else {
    console.log("You are not authorized for this action.");
    return;
  }
});

app.get('/weekly-bulletin', (req, res) => {
  var filePath = '/public/bulletin.pdf';
  fs.readFile(__dirname + filePath , function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
});

app.use(function(req, res, next){
    res.status(404).render('404', {title});
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

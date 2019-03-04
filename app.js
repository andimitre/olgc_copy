const express = require('express');
const chalk = require('chalk');
const debug = require('debug');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const AWS = require('aws-sdk');
var PDFDocument = require('pdfkit');
const config = JSON.parse(fs.readFileSync(__dirname + '/public/src/data/config.json', 'utf8'));
const app = express();
const port = process.env.PORT || 5000;

const title = "Our Lady Of Good Counsel";
const adminRouter = require(__dirname + '/public/src/routes/adminRoutes')(title);
const submitRouter = require(__dirname + '/public/src/routes/submitRouter')(title);
const aboutRouter = require(__dirname + '/public/src/routes/aboutRoutes')(title);
const educationRouter = require(__dirname + '/public/src/routes/educationRoutes')(title);
const homeRouter = require(__dirname + '/public/src/routes/homeRoutes')(title);
const sacramentalLifeRouter = require(__dirname + '/public/src/routes/sacramentalLifeRouter')(title);
const galleryRouter = require(__dirname + '/public/src/routes/galleryRoutes')(title);
const contactRouter = require(__dirname + '/public/src/routes/contactRoutes')(title);
const formRouter = require(__dirname + '/public/src/routes/formRoutes')(title);

const s3 = new AWS.S3({
  accessKeyId: config.user[0].aws_key,
  secretAccessKey: config.user[0].aws_secret
});

app.use(fileUpload());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())
app.set('views', __dirname + '/public/' + '/src/views');
app.set('view engine', 'ejs');


// routing
app.use('/education', educationRouter);
app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/sacramental-life', sacramentalLifeRouter);
app.use('/gallery', galleryRouter);
app.use('/contact', contactRouter);
app.use('/admin', adminRouter);
app.use('/form-submit', submitRouter);
app.use('/forms', formRouter);

// routes
app.get('/', (req, res) => {
  res.render('home', {title});
});

app.post('/upload', function(req, res) {
  if (config.user[0].admin == req.body.password) {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.sampleFile;
    sampleFile.mv(__dirname + '/public/bulletin.pdf', function(err) {
      if (err)
        console.log('error in uploading file:', err, '');
    });

    var doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(__dirname + '/public/bulletin.pdf'));
    doc.text();
    doc.end();
    doc.on('end', function () {
      fs.readFile(__dirname + '/public/bulletin.pdf', function (err, data) {
        if (err) {
          console.log(err);
        }
        s3.upload({
          Bucket: 'olgc-newark',
          Key: 'bulletin.pdf',
          Body: data,
          ContentType: 'application/pdf'
        }, function(err, data) {
          if (err) {
            console.log(err);
          }
        });
      });
    });

    res.redirect('/form-submit');

  } else {
    console.log("You are not authorized for this action.");
    res.redirect('/admin');
  }
});

app.get('/weekly-bulletin', (req, res) => {
  var fileName = 'bulletin.pdf';
  // fs.readFile(__dirname + filePath , function (err, data){
     // res.contentType("application/pdf");
     // res.send(data);
  // });

  s3.getObject({ Bucket: 'olgc-newark', Key: fileName }, function(err, data) {
      if (!err)
          res.contentType("application/pdf");
          res.send(data.Body);
  });
});

app.use(function(req, res, next){
    res.status(404).render('404', {title});
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

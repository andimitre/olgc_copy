const express = require('express');
const galleryRouter = express.Router();
const fs = require('fs');
// const events = JSON.parse(fs.readFileSync(__dirname + '/../data/events.json', 'utf8'));


function router(title, latest) {
  galleryRouter.route('/')
    .get((req, res) => {
      res.render('gallery',
      {
        title,
        latest
      });
    });

    return galleryRouter;
}

module.exports = router;

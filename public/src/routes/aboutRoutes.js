const express = require('express');
const aboutRouter = express.Router();
const fs = require('fs');
// const events = JSON.parse(fs.readFileSync(__dirname + '/../data/events.json', 'utf8'));


function router(title) {
  aboutRouter.route('/')
    .get((req, res) => {
      res.render('about',
      {
        title
      });
    });

    return aboutRouter;
}

module.exports = router;

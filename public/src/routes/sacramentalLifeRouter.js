const express = require('express');
const sacramentalLifeRouter = express.Router();
const fs = require('fs');
// const events = JSON.parse(fs.readFileSync(__dirname + '/../data/events.json', 'utf8'));


function router(title) {
  sacramentalLifeRouter.route('/')
    .get((req, res) => {
      res.render('sacramental-life',
      {
        title
      });

    });

    return sacramentalLifeRouter;
}

module.exports = router;

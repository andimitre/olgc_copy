const express = require('express');
const sacramentalLifeRouter = express.Router();
const fs = require('fs');


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

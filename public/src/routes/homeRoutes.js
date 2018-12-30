const express = require('express');
const homeRouter = express.Router();
const fs = require('fs');

function router(title) {
  homeRouter.route('/')
    .get((req, res) => {
      res.render('home',
      {
        title
      });
    });

    return homeRouter;
}

module.exports = router;

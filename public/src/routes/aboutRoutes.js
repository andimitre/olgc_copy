const express = require('express');
const aboutRouter = express.Router();
const fs = require('fs');


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

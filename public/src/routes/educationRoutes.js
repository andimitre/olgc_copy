const express = require('express');
const educationRouter = express.Router();
const fs = require('fs');


function router(title) {
  educationRouter.route('/')
    .get((req, res) => {
      res.render('education',
      {
        title
      });
    });

    return educationRouter;
}

module.exports = router;

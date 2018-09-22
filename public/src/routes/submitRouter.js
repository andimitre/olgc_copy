const express = require('express');
const submitRouter = express.Router();
const fs = require('fs');

function router(title) {
  submitRouter.route('/')
    .get((req, res) => {
      res.render('form-submit',
      {
        title
      });

    });

    return submitRouter;
}

module.exports = router;

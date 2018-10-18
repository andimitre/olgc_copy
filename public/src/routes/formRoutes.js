const express = require('express');
const formRouter = express.Router();
const fs = require('fs');

function router(title) {
    formRouter.route('/')
    .get((req, res) => {
      res.render('forms',
      {
        title
      });

    });

    return formRouter;
}

module.exports = router;

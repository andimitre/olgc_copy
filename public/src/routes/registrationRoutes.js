const express = require('express');
const registrationRouter = express.Router();
const fs = require('fs');

function router(title) {
    registrationRouter.route('/')
    .get((req, res) => {
      res.render('registration',
      {
        title
      });

    });

    return registrationRouter;
}

module.exports = router;

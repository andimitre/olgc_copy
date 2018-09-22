const express = require('express');
const eventRouter = express.Router();


function router(title, events, latest, timeUntilEvent) {
  eventRouter.route('/')
    .get((req, res) => {
      res.render('events',
      {
        title,
        events,
        latest,
        timeUntilEvent
      });
    });

  eventRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('event',
      {
        title,
        event: events[id],
        latest,
        timeUntilEvent
      });
    });

    return eventRouter;
}

module.exports = router;

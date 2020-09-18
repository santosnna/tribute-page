const express = require('express');

const formationRoute = require('./formations');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.render('layout', {
      pageTitle: 'Fletwood Mac',
      template: 'index'
    });
  });

  router.use(formationRoute());
  return router;
};
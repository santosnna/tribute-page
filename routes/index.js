const express = require('express');

const formationRoute = require('./formations');

const router = express.Router();

module.exports = (params) => {

  const {
    formationService
  } = params;

  router.get('/', async (req, res) => {
    const formations = await formationService.getList();

    res.render('layout', {
      pageTitle: 'Fletwood Mac',
      template: 'index',
      formations
    });
  });

  router.use('/formations', formationRoute(params));
  return router;
};
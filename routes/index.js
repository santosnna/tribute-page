const express = require('express');
const {
  NotExtended
} = require('http-errors');

const formationRoute = require('./formations');

const router = express.Router();

module.exports = (params) => {

  const {
    formationService
  } = params;

  router.get('/', async (req, res, next) => {
    try {
      const formations = await formationService.getList();

      return res.render('layout', {
        pageTitle: 'Fletwood Mac',
        template: 'index',
        formations
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/formations', formationRoute(params));
  return router;
};
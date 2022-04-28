const express = require('express');

const router = express.Router();

module.exports = (params) => {

  const {
    formationService
  } = params;

  router.get('/', async (req, res, next) => {
    try {
      const formation = await formationService.getList();

      return res.render('layout', {
        pageTitle: 'Formations',
        template: 'formations',
        formation
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const formation = await formationService.getFormation(req.params.shortname);

      return res.render('layout', {
        pageTitle: formation.title,
        template: 'formation-detail',
        formation
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
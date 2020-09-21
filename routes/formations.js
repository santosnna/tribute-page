const express = require('express');

const router = express.Router();

module.exports = (params) => {

  const {
    formationService
  } = params;

  router.get('/', async (req, res) => {
    const formation = await formationService.getList();

    res.render('layout', {
      pageTitle: 'Formations',
      template: 'formations',
      formation
    });
  });

  router.get('/:shortname', async (req, res) => {
    const formation = await formationService.getFormation(req.params.shortname);

    res.render('layout', {
      pageTitle: formation.title,
      template: 'formation-detail',
      formation
    });
  });

  return router;
};
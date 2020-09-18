const express = require('express');

const router = express.Router();

const getPageTitle = (name) => {
  switch (name) {
    case 'peter-green':
      return 'Peter Green Era (1967 - 1970)';
    case 'bob-welche':
      return 'Bob Welche Era (1971 - 1974)';
    case 'buckingham-nicks':
      return 'Lindsey Buckingham and Stevie Nicks Era (1974 - latest)';
    default:
      return 'Fleetwood Mac'
  }
};

module.exports = () => {
  router.get('/:formation', (req, res) => {
    res.render('layout', {
      pageTitle: getPageTitle(req.params.formation),
      template: req.params.formation
    });
  });

  return router;
};
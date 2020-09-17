const express = require('express');
const path = require('path');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.send('band-era page');
  });

  router.get('/:bandera', (req, res) => {
    res.sendFile(path.join(__dirname, `../views/pages/${req.params.bandera}.html`));
  });

  return router;
};
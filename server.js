const express = require('express');
const path = require('path');

const routes = require('./routes');

const app = express();

app.use(express.static(path.join(__dirname, "./assets")));

app.use('/', routes());

app.listen(3000, () => {
  console.log('Server running...');
});
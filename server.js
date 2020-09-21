const express = require('express');
const path = require('path');

const FormationService = require('./services/FormationService');

const formationService = new FormationService('./data/formations.json');

const routes = require('./routes');
const {
  response
} = require('express');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {

  try {
    const names = await formationService.getMembers();
    res.locals.memberNames = names;
    return next();

  } catch (err) {
    return next(err);
  }
});

app.use('/', routes({
  formationService,
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
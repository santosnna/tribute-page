const express = require('express');
const path = require('path');
const createError = require('http-errors');

const FormationService = require('./services/FormationService');

const formationService = new FormationService('./data/formations.json');

const routes = require('./routes');

const app = express();

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

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.log(res.locals.message);
  console.error(err);
  const status = err.status || 500;
  res.locals.status = status;
  console.log(res.locals.status);
  res.status(status);
  res.render('error');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
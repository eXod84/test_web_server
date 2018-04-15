const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const log = `${new Date()}: ${req.method} ${req.url} `;
  console.log(log);
  fs.appendFile('log.log', log + '\n', err => err & console.log(err));
  next();
});

// app.use((req, res, next)=> {
//   res.render('maintance.hbs');
// });

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

app.get('/', (req, res) => {
  res.render('main.hbs', {
    Title: 'Main page',
    welcomeMsg: 'Hello there',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    Title: 'About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something bad.'
  });
});

app.listen(PORT, () => {
  console.log(`App starts on ${PORT}`);
});
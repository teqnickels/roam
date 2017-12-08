const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./server/routes');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/', routes);

// app.use((request, response) => {
//   response.render('common/not_found');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
});

module.exports = app;

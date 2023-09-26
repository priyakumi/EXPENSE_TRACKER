// Dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});
const routes = require('./controllers');


const app = express();
const PORT = process.env.PORT || 3005;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

//Handler-engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//
app.use(express.static(path.join(__dirname, 'public')));

//pages
app.use(require('./controllers/api/expenseformRoute'));




// Starts the server to begin listening
app.listen(PORT, () => {
  console.log('Server listening on: http://localhost:' + PORT);
});

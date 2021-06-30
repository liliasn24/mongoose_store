require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const db = require('./models/db');
const app = express();
const PORT = process.env.PORT || 3000;

// Set up date
db.once('connected', () => {
  console.log('Connected to Mongo')
})

// Set up view engine

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine())
app.use((req, res, next) => {
  res.locals.data = {}
  next()
});

// Set up middleware and controllers

app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/fruits', require('./controllers/routeController'));
app.listen(PORT, () => {
  console.log('Listening on port ', PORT)
})

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const { database } = require('./dbConfig');

const app = express();
require('./helpers/passport');

// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'pruebamysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(passport.initialize());
app.use(passport.session());
/* app.use(validator()); */

// Global variables
app.use((req, res, next) => {
    app.locals.user = req.user;

    next();
});

// Routes
app.use(require('./routes/accessRoutes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
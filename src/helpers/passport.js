const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const dbConn = require('../dbConnection');
const helpers = require('./bcrypt');

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await dbConn.query('select * from user where username = ?', [username]);

    if (rows.length > 0) {
        const user = rows[0];
        const passValid = await helpers.matchPassword(password, user.password);

        if (passValid) {
            done(null, user);
        } else {
            done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const newUser = req.body;

    newUser.password = await helpers.encryptPassword(password);

    const insert = await dbConn.query('insert into user set ?', newUser);
    newUser.id = insert.insertId;

    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await dbConn.query('select * from user where id = ?', [id]);
    done(null, rows[0]);
});
const express = require('express');
const dbConn = require('../dbConnection');
const passport = require('passport');
const { isLoggedIn, isLoggedOut } = require('../helpers/autenticacion');

const router = express.Router();

router.get('/signin', isLoggedOut, (req, res) => {
    res.render('signin');
});

router.post('/signin', isLoggedOut, (req, res) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin'
    })(req, res);
});

router.get('/signup', isLoggedOut, (req, res) => {
    res.render('signup');
});

/* Viernes 31 de Julio trabajo sobre esta ruta. */
router.post('/signup', isLoggedOut, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
}));

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

module.exports = router;
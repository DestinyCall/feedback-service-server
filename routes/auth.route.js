const router = require('express').Router();
const passport = require('passport');

require('../service/auth/passport-google')

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',passport.authenticate('google'),(req, res) => 
{
    res.redirect('/survey');
});

module.exports = router;
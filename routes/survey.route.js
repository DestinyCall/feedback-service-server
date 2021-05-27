const router = require('express').Router();
const requireLogin = require('../middlewares/requireLogin');

router.get('/surveys', requireLogin, (req, res) => {
  res.send('Survey');
});

module.exports = router;

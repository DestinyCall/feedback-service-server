const router = require('express').Router();

const auth = require('./auth.route');
const survey = require('./survey.route');
const billing = require('./billing.route');

router.use(auth);
router.use(survey);
router.use(billing);

module.exports = router;

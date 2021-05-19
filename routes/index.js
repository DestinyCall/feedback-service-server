const router = require('express').Router();

const auth = require("./auth.route");
const survey = require("./survey.route");

router.use(auth);
router.use(survey);

module.exports = router;
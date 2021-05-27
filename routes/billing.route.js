const router = require('express').Router();
const requireLogin = require('../middlewares/requireLogin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/api/stripe', requireLogin, async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'inr',
      description: 'Rs.5 for 5 surveys',
      source: req.body.id,
    });
    //console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;

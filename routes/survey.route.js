const router = require('express').Router();
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
//const Mailer = require('../service/mail/Mailer');
const Mailer = require('../service/mail/Sendmail');
const surveyTemplate = require('../service/mail/emailTemplates/surveyTemplate');

const Survey = require('../models/Survey');

router.get('/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });
  res.send(surveys);
});

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting!');
});

router.post('/api/surveys/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  _.chain(req.body)
    .map(({ email, url }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return { email, surveyId: match.surveyId, choice: match.choice };
      }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  res.send({});
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  // Great place to send an email!
  try {
    Mailer(
      {
        from: 'no-reply@feedback.com',
        to: 'dev@gmail.com',
        subject: survey.subject,
        html: surveyTemplate(survey),
      },
      (err, reply) => {
        if (err) {
          console.log(err);
        }
      }
    );
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = router;

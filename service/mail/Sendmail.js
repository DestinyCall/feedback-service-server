const sendmail = require('sendmail')({
  silent: false,
  devPort: 2525,
  devHost: 'localhost',
  //smtpPort: 2525,
  //smtpHost: 'localhost',
});
module.exports = sendmail;

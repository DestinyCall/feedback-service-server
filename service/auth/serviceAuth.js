const passport = require('passport')
const GoogleStrategy = require("passport-google-oauth20")
const User = require("../../models/Users")

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try { 
        const currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          return done(null, currentUser, { statusCode: 200 });
        }

        const email = profile.emails[0].value;
        const userName = profile.emails[0].value;

        const checkEmail = await User.checkExistingField("email", email);
        if (checkEmail) {
          const user = await User.findByIdAndUpdate(
            checkEmail._id,
            { googleId: profile.id },
            { new: true }
          );
          return done(null, user, { statusCode: 200 });
        }

        const userObj = new User({
          googleId: profile.id,
          userName,
          email,
        });

        const user = await userObj.save({ validateBeforeSave: false });

        return done(null, user, { statusCode: 201 });
      } catch (err) {
        DEBUG(err);
        done(err, false);
      }
    }
  )
);

module.exports = passport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../models/user');
const lib = require('../lib');

passport.serializeUser(function (user, done) {
  console.log('Serialize: ', user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  console.log('Deserialize: ', id);
  user.getById(id)
    .then(userObj => {
      if (userObj) {
        done(null, userObj);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      done(err);
    });
});

passport.use(
  new LocalStrategy(
    function (username, password, done) {
      console.log('2222');
      user.getByUsername(username)
        .then(userObj => {
          if (userObj) {
            if (userObj.password === lib.hashPassword(password)) {
              return done(null, userObj);
            }
          } else {
            return done(null, false);
          }
        })
        .catch(err => done(err));
    }
  )
);

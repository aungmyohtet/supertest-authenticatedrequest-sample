const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const users = [
  {id: 1, email: 'user1@email.com', password: 'password1'},
  {id: 1, email: 'user2@email.com', password: 'password2'}
]

const findUserByEmail = (email) => {
  const user =  users.find((u) => {
    return u.email === email;
  });
  return user;
};

const findUserById = (id) => {
  const user = users.find((u) => {
    return u.id === id;
  });
  return user;
};

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (username, password, done) => {
    try {
      const user = findUserByEmail(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = findUserById(id);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});

module.exports = passport;

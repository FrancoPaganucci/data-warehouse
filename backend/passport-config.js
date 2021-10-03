const LocalStrategy = require('passport-local').Strategy;


function initialize(passport, getUserByEmail) {
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, flase, { message: 'No user with that email'});
        }

        try {
            if (await ) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect'});
            }
        } catch (error) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy( { usernameField: 'email' }), authenticateUser);
    passport.serializeUser((user, done) => {  })
    passport.deserializeUser((id, done) => {  })
}

module.exports = initialize
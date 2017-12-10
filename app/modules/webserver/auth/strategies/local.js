var LocalStrategy = require('passport-local').Strategy
import UserModel from 'app/users/model'
import AuthTokenModel from 'app/auth_token/model'


module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, function (request, email, password, done) {
    var User, AuthToken

    User = new UserModel()
    User._model.findOne({email: email.toLocaleLowerCase()}).exec(function (err, user){
      if (err) {
        return done(err, false, {
          message: 'Authentication fail'
        });
      }

      if (!user) {
        return done({
          status: 401,
          message: 'Authentication fail'
        }, false, {
          message: 'Authentication fail'
        });
      }
      user.comparePassword(password, function (error, isMatch){
        if (error) {
          return done(error, false, {
            message: 'Authentication fail'
          });
        }

        if (!isMatch) {
          return done(null, false, {
            message: 'Authentication fail'
          });
        }

        AuthToken = new AuthTokenModel()
        AuthToken._model.get_or_create(user.id, function (error, result){
          var error;

          if (error) {
            return done(error, null);
          }

          if (result === null) {
            error = new Error("Something went wrong getting the AuthToken");
            error.status = 500;
            return done(error, null);
          } else {
            user.token = result.token;
            user = user.toJSON();
            delete user.password
            return done(null, user);
          }

        })

      })

    })
})

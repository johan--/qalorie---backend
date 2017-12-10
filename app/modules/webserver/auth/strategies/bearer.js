var BearerStrategy = require('passport-http-bearer').Strategy
import AuthTokenModel from 'app/auth_token/model'
import UserModel from 'app/users/model'


module.exports = new BearerStrategy(function(token, done) {
  var AuthToken, User

  AuthToken = new AuthTokenModel()
  AuthToken._model.verify(token, function (error, token){
    if (error) {
      return done(error, false, {
        message: 'Authentication fail'
      });
    }

    if (!token) {
      return done(null, null, {
        status: 401,
        message: 'Authentication fail'
      });
    }

    User = new UserModel()
    User._model.findOne({_id: token.user_id}).exec(function (err, user){
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

      done(null, user)
    })


  })
});

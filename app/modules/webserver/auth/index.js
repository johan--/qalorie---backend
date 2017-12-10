import UserModel from 'app/users/model'

var passport = require('koa-passport')
var passport_local = require('./strategies/local');
var passport_bearer = require('./strategies/bearer');
var passport_facebook = require('./strategies/facebook');

var user = { id: 1, username: 'test' }

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  var User = new UserModel()
  User._model.findOne({_id: id}).exec(function (err, user){
    if (err) {
      return done(err, false, {
        message: 'Authentication fail'
      });
    }
    if (!err && !user ) {
      return done(err, user)
    }
    if (!user) {
      return done({
        status: 401,
        message: 'Authentication fail'
      }, null, {
        message: 'Authentication fail'
      });
    }

    done(null, user)
  })
  return
})

passport.use('local', passport_local)
passport.use('bearer', passport_bearer)
passport.use('facebook-token', passport_facebook)

module.exports = passport

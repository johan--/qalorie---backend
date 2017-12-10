var FacebookTokenStrategy = require('passport-facebook-token').Strategy;
import UserModel from 'app/users/model'
import UserManager from 'app/users/index'
import AuthTokenModel from 'app/auth_token/model'
import conf from "config"
var co = require('co');

module.exports = new FacebookTokenStrategy({
  // pull in our app id and secret from our auth.js file
  clientID        : conf.get("facebook.client_id"),
  clientSecret    : conf.get("facebook.client_secret"),
  passReqToCallback: true,
  profileFields: ['emails', 'first_name', 'last_name']
},
// facebook will send back the token and profile
function(req, token, refreshToken, profile, done) {
  // asynchronous
  process.nextTick(function() {

    var User = new UserModel()
    User._model.findOne({facebook_id: profile.id}).exec(function (err, user){
      if (err) {
        return done(err, false, {
          message: 'Authentication fail'
        });
      }

      if(profile.emails[0].value == '' || profile.emails[0].value == undefined){
        return done({
          status: 500,
          message: "We need some extra information we can't retrieve from facebook due to your privacy settings"
        }, null);
      }

      var AuthToken = new AuthTokenModel();

      if (!user) {
        if(req.body.checkUser !== undefined || req.body.checkUser){
          return done(err, false, {
            status: 404,
            message: 'The user must be created'
          });
        }

        //Check if the email is allready registered.
        User._model.findOne({email: req.body.email}).exec(function (err, userExist){
          if (err) {
            return done(err, false, {
              status: 404,
              message: 'Authentication fail'
            });
          }

          if(!userExist){
            var user_manager = new UserManager();
            var newUser;

            var data = {
              facebook_id: profile.id,
              facebook_token: req.body.access_token,
              email: req.body.email,
              first_name:req.body.name,
              last_name:req.body.lastname,
              gender:req.body.gender
            };
            co( function* () {
              newUser = yield user_manager.create(data);
              return newUser
            }).then( function (newUser) {
              AuthToken._model.get_or_create(newUser.id, function (error, result){
                var error;
                if (error) {
                  return done(error, null);
                }
                if (result === null) {
                  error = new Error("Something went wrong getting the AuthToken");
                  error.status = 500;
                  return done(error, null);
                } else {
                  newUser.token = result.token;
                  newUser = newUser.toJSON();
                  delete newUser.password
                  return done(null, newUser);
                }
              })
            }, function (err) {
              return done(err, false, {
                status: 404,
                message: 'Authentication fail'
              });
            });
          }else{
            return done({
              status: 500,
              error:1,
              message: "The email " + req.body.email + " is registered on the system"
            }, null);
          }
        });

      }else{

        var AuthToken = new AuthTokenModel()
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

      }
    });
  });

});

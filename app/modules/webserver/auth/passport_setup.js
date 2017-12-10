// check: https://github.com/rkusa/koa-passport-example

var passport = require("koa-passport");
var app = require("koa");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, user);
});

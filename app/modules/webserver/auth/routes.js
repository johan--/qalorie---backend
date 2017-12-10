import UserModel from 'app/users/model'
import conf from "config"

var _ = require('underscore')
var sendgrid  = require('sendgrid')(conf.get("sendgrid.app_id"), conf.get("sendgrid.secret_id"));
var bcrypt = require("bcrypt")
var passport = require('./index')
var stripe = require("stripe")(conf.get("stripe.private_key"));

var SALT_WORK_FACTOR = 10

module.exports.start = function (app, options = {}) {
  let default_options = {
    prefix: ''
  }
  _.extend(default_options, options)
  app.post(default_options.prefix + '/auth/local', function*(next) {
    var ctx = this
    yield* passport.authenticate('local', function*(err, user, info) {
      if (err) { // FIXME: there is a global error handler?
        ctx.status = 401
        ctx.body = err
        return
      }
      if (!user) {
        ctx.status = 401
        ctx.body = info || ""
      } else {
        yield ctx.login(user)
        ctx.body = user
      }
    }).call(this, next)
  })

  app.get(default_options.prefix + '/protected', passport.authenticate('local'), function* (){
    console.log("user: ", this.user)
  })

  app.post(default_options.prefix + "/check-login",function*(next){
    var ctx = this;
    yield* passport.authenticate('check-login', function*(err, user, info) {
      if(user.user != false){
        ctx.response.status = 200;
        ctx.response.body = user;
        yield ctx.login(user)
      }else{
        ctx.response.status = 200;
        ctx.response.body = user;
      }

    }).call(this, next)

  })
  app.post(default_options.prefix + '/auth/facebook/token',function*(next){
    var ctx = this;
    yield* passport.authenticate('facebook-token', {session:false, scope: ['emails', 'first_name', 'last_name','user_birthday']} , function*(err, user, info) {

      if(err){
        ctx.response.status=500;
        ctx.body = err;
        return;
      }

      if(info){
        ctx.response.status=403;
        ctx.body = info;
        return;
      }

      if(!user){
        ctx.response.status=500;
        ctx.body = info;
      }else{
        yield ctx.login(user)
        ctx.response.status=200;
        ctx.body = user;
      }

    }).call(this, next)
  });


  app.post(default_options.prefix + '/recovery/password', function*(next) {
    var User = new UserModel();

    try{
      var user = yield User._model.findOneAsync({email: this.request.body.email_user});
      if(!user){
        this.response.status=500;
        this.body={
          message:"Theres any user with the email " + this.request.body.email_user
        }
      }else{
        if(user.facebook_id){
          this.response.status=500;
          this.body={
            message: this.request.body.email_user + " was registered with facebook please login with your facebook account "
          }
        }else{

            var url = conf.get("app.baseUrl") + "/restore/" + user._id;

            var email = new sendgrid.Email({
              to:       this.request.body.email_user,
              from:     conf.get("emails.sender"),
              fromname: conf.get("emails.sender_name"),
              subject:  'Qalorie password recovery',
              //text:     'My first email through SendGrid.',
              html:     "<a href='" + url + "' class='container560'>" + url + "</a>"
            });


            email.setFilters({
                'templates': {
                    'settings': {
                        'enable': 1,
                        'template_id' : conf.get("sendgrid.recover_id"),
                    }
                }
            });

            email.addSubstitution('-recoverlink-', url);

            sendgrid.send(email, function(err, json) {
              if (err) { return console.error(err); }
              console.log(json);
            });

            this.body = {
                   msg: 'Email sended to ' + this.request.body.email_user
            };

            /*var url = conf.get("app.baseUrl") + "/restore/" + user._id;
            var mailOptions = {
                from: 'apps@nullindustries.co', // sender address
                to: this.request.body.email_user, // list of receivers
                subject: 'Hello', // Subject line
                text: 'Hello world', // plaintext body
                html:"Hola",
                x-smtpapi: filter
            };

            try{
              var resp = yield client.sendMail(mailOptions);
              console.log(resps)
              return
            }catch(e){
              console.log("Error sending mail")
             return this.body = {
                 msg: e
             };
            }

            this.body = {
                   msg: 'Email sended to ' + this.request.body.email_user
            };*/

        }
      }

    }catch(e){
     return this.body = {
         msg: e
     };
    }


  });

  app.post(default_options.prefix + '/reset/password', function*(next) {
    var User = new UserModel();
    try{

      var password=this.request.body.password;
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password, salt);

      var user = yield User._model.findByIdAndUpdateAsync(this.request.body.userId, {password: hash});

      if(!user){
        this.response.status=500;
        this.body = {message:'This user doesnt exist please follow the instructions on the email'};
        return;
      }

    }catch(error){
      this.response.status=500;
      this.body = {message:'Error updating password'};
    }

    this.body = {message:'password changed'};

  });

  app.post(default_options.prefix + '/appointment/pay',function*(next){
    var stripeToken = this.request.body.stripeToken;
    var description = this.request.body.description;
    try{
      var paymentResponse = yield stripe.charges.create({
        amount: 1999, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: description
      });

      if(paymentResponse.status == 'succeeded'){
        var dolarAmount = parseFloat(paymentResponse.amount / 100);
        this.body = {message:'Your ' + dolarAmount + " was made successfully"};
      }else{
        this.response.status=500;
        this.body ={message:"An error ocurre making the payment"};
      }


    }catch(e){
      this.response.status=500;
      this.body ={message:e.message};
      console.log(e);
    }
  });

}

import BaseController from "null/koapi/controller"
var moment = require('moment')

export default class WaterLogController extends BaseController{
  *findAll(request) {

    if(request.query.current){ 
      var error, result;
      try {

        result = yield this.modelManager.findOne({
          user: request.req.user._id,
          date: request.query.dateSelected
        }); 

        if(result == null){
          var data = {
            user:request.req.user._id,
            glasses:0,
            date:request.query.dateSelected
          };

          console.log(data.date);
          try{
            var r = yield this.modelManager.create(data);
            console.log(r);
            request.status = 200;
            return request.body = r;
          }catch(e){
            console.log(e);
          }

        }else{
          request.status = 200
          request.body = result
        }

      } catch (_error) {
        error = _error;
        return request.body = error;
      }
    }else if(request.query.perUser){
      console.log("Pasar por aqui perUser");
      try{
        /*result = yield this.modelManager.findAll({
          user: request.req.user._id
        });*/

        result = {
          data: yield this.modelManager.findAll({user: request.req.user._id}),
          nextHref:"test"
        }

        //nextHref: request.request.protocol + '://' + request.request.host + request.request.path + '?' + querystring.stringify({offset: offset+limit, limit: limit}) + '&' + querystring.stringify(request.request.query)

        request.status = 200;
        return request.body = result;

      }catch(error){
        error = _error;
        return request.body = error;
      }
    }else{

      try{
        result = yield this.modelManager.findOne({
          user: request.req.user._id,
          date: request.query.dateSelected
        });

        if(result == null){

          var data = {
            user:request.req.user._id, 
            glasses:0,
            date:request.query.dateSelected
          };

          try{
            var r = yield this.modelManager.create(data);
            console.log(r);
            request.status = 200
            request.body = r;
          }catch(e){
            console.log(e);
          }


        }else{
          request.status = 200
          request.body = result
        }

      }catch(error){
        error = _error;
        return request.body = error;
      }

    }
  }

  *create(request) {
    var current, result
    try {

      current = yield this.modelManager.findOne({
        user: request.req.user._id,
        date: request.request.body.dateSelected
      });

      // food_log for current exist
      if (current) {
        current.glasses += request.request.body.glasses
        result = yield current.saveAsync()
        request.status = 200
        request.body = result[0]
      }else{
        request.request.body.user = request.req.user._id
        request.request.body.date = request.request.body.dateSelected;
        var waterConsume = yield super.create(request)
        console.log(waterConsume);
      }

    } catch (_error) {
      error = _error;
      return request.body = error;
    }
  }
}

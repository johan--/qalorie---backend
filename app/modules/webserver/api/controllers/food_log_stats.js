import BaseController from "null/koapi/controller"

var moment = require('moment')

export default class FoodLogController extends BaseController{
  *findAll(request) {
    if(request.query.current){
      var error, result;
      try {
        result = yield this.modelManager.findOne({
          user: request.req.user._id,
          date: moment(moment().format('YYYY/MM/DD'), "YYYY/MM/DD").toISOString()
        });

        // food_log for current exist
        if (result) {
          request.status = 200
          request.body = result
        }else{
          request.status = 404
          request.throw(404)
        }

      } catch (_error) {
        error = _error;
        return request.body = error;
      }
    }else{
      yield super.findAll(request);
    }
  }
}

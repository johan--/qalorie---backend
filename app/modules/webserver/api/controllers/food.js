import BaseController from "null/koapi/controller"
var _ = require('underscore')
var moment = require('moment')

export default class FoodController extends BaseController{
  *findAll(request) {
    
    var result = yield super.findAll(request)
    
    return result
  }

  *create(request) {
    if(request.request.body.type == 'user'){
      request.request.body.user = request.req.user._id
    }
    yield super.create(request)
  }

}

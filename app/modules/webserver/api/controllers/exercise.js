import BaseController from "null/koapi/controller"

var moment = require('moment')

export default class ExerciseController extends BaseController{
  *findAll(request) {
    if (request.request.query.name){
      request.request.query.name = new RegExp(`${request.request.query.name}.*`, 'i')
    }
    yield super.findAll(request)
  }

  *create(request) {
    if(request.request.body.type != 'generic'){
      request.request.body.user = request.req.user._id
    }
    yield super.create(request)
  }

}

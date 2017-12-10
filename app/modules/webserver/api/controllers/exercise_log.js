import BaseController from "null/koapi/controller"

var moment = require('moment')

export default class ExerciseLogController extends BaseController{

  *findAll(request) {
    // request.request.query = {}
    // request.request.query.user = request.req.user._id
    // request.request.query.asd='asdasda'

    yield super.findAll(request)
  }

  *create(request) {
  	console.log(request);
    request.request.body.user = request.req.user._id
    yield super.create(request)
  }

}

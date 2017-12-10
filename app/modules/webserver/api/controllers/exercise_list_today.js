import BaseController from "null/koapi/controller"

var moment = require('moment') 

export default class ExerciseListTodayController extends BaseController{
  *create(request) {
  	console.log("Aca actualizaremos o crearemos la lista del dia");
    request.request.body.user = request.req.user._id
    yield super.findOneAndUpdate(request)

  }
}

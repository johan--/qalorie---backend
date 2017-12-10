import BaseController from "null/koapi/controller"


export default class AppointmentLogController extends BaseController {

  *findAll(request) {
    if (!request.req.user.is_nutritionist){
      request.request.query.patient = request.req.user._id;
    }

    yield super.findAll(request)
  }

  *create(request) {
    request.request.body.patient = request.req.user._id;
    yield super.create(request);
  }

}

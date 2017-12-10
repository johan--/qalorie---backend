import BaseController from "null/koapi/controller"


export default class AppointmentController extends BaseController {

  *findAll(request) {
    if (request.request.query.search){

      request.request.query['$or'] = [
        {
          'quiz.question1': new RegExp(`.*${request.request.query.search}.*`, 'i')
        },
        {
          'replies.message': new RegExp(`.*${request.request.query.search}.*`, 'i')
        }
      ]

      delete request.request.query.search
    }
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

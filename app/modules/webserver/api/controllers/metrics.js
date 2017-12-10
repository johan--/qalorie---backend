import BaseController from "null/koapi/controller"


export default class MetricsController extends BaseController {

  *findAll(request) {
    if (!request.req.user.is_nutritionist) {
      request.request.query.user = request.req.user._id;
    }
    yield super.findAll(request);
  }
}

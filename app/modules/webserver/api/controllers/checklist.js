import BaseController from "null/koapi/controller"


export default class ChecklistItemController extends BaseController {

  *create(request) {
    request.request.body.user = request.req.user._id;
    yield super.create(request);
  }

}

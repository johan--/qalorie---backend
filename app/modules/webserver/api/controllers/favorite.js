import BaseController from "null/koapi/controller"


export default class FavoriteController extends BaseController {

  *create(request) {
    request.request.body.owner = request.req.user._id;
    yield super.create(request);
  }

}

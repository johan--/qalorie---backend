import BaseController from "null/koapi/controller"


export default class CardController extends BaseController {

  *create(request) {
    request.request.body.user = request.req.user._id;
    yield super.create(request);
  }

  *updateById(request) {
    request.request.body.user = request.req.user._id;
    yield super.updateById(request);
  }

  *deleteById(request) {
    var error, result;
    try {
      result = yield this.modelManager.deleteById(request.req.user._id, request.params.id)
      return request.body = result;
    } catch (_error) {
      console.log('ERROR', JSON.stringify(_error))
      request.throw(_error)
      // error = _error;
      // if (typeof error == 'object'){
      //   request.status = parseInt(_error.status)
      // }else{
      //   request.status = 500
      // }
      return request.body = error;
    }
  }
}

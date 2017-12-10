import BaseController from "null/koapi/controller"


export default class ProgressController extends BaseController {

  *create(request) {
    request.request.body.user = request.req.user._id;
    if (request.request.height > 0 && request.request.weight > 0){
      request.request.bmi = (weight * 10000) / (height * height)  // 10000 is to convert from cm2 to m2
      request.request.bmi = request.request.bmi.toFixed(2)
    }
    yield super.create(request);
  }

  *replaceById(request) {
    if (request.request.height > 0 && request.request.weight > 0){
      request.request.bmi = (weight * 10000) / (height * height)  // 10000 is to convert from cm2 to m2
      request.request.bmi = request.request.bmi.toFixed(2)
    }
    yield super.replaceById(request);
  }

  *updateById(request) {
    if (request.request.height > 0 && request.request.weight > 0){
      request.request.bmi = (weight * 10000) / (height * height)  // 10000 is to convert from cm2 to m2
      request.request.bmi = request.request.bmi.toFixed(2)
    }
    yield super.updateById(request);
  }

}

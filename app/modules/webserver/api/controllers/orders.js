import BaseController from "null/koapi/controller"

var moment = require('moment')

export default class OrderController extends BaseController{

  *create(request) {
    request.request.body.user = request.req.user._id
    yield super.create(request)
  }

}

import BaseController from "null/koapi/controller"

var moment = require('moment')

export default class UserController extends BaseController{
  // *findAll(request) {
  //   if (request.req.user.is_admin){
  //     return yield super.findAll(request)
  //   }else{
  //     request.params = {
  //       _id: request.req.user._id
  //     }
  //     return yield super.findOne(request)
  //   }
  // }
}

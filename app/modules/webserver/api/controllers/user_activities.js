import BaseController from "null/koapi/controller"
var _ = require('underscore')
var moment = require('moment')

export default class UserActivitiesController extends BaseController{
  
  *create(request) {
    request.request.body.user = request.req.user._id
    yield super.create(request)
  }
}

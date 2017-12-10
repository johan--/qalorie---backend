import BaseController from "null/koapi/controller"

var moment = require('moment')

export default class FoodListController extends BaseController{
  *findAll(request) {
    request.request.query.user = request.req.user._id
    if(request.request.query.created){
      request.request.query.created = {
        "$gte": moment(request.request.query.created).toISOString(),
        "$lt": moment(request.request.query.created).add('d', 1).toISOString()
      }
    }
    if (request.request.query.name){
      request.request.query.name = new RegExp(`${request.request.query.name}.*`, 'i')
    }
    yield super.findAll(request)
  }

  *create(request) {
    request.request.body.user = request.req.user._id
    yield super.create(request)
  }
}

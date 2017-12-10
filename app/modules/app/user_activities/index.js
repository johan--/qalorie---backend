import Model from "./model"
import BaseManager from "app/base/manager"
var _ = require('underscore')


export default class UserActivitiesManager extends BaseManager{

  constructor(options){
    this.model = new Model()
    this.populate = {
      "user": '',
    }
  }

  *findAll(query, limit, offset) {
    if (query.sort) {
      this.sort = query.sort
      delete query.sort
    }
    return yield super.findAll(query, limit, offset)
  }

}

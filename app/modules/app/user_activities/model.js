import BaseModel from "app/base/model"

import Promise from "bluebird"
var mongoose = Promise.promisifyAll(require('mongoose'))
var _ = require('underscore')

let schema = {
  created: {type: Date, default: Date.now},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
  activity: String
}


export default class UserActivities extends BaseModel{
  constructor(options){
    this._name = "user_activities" //TODO: Use introspection to not need this
    this._schema = new mongoose.Schema(schema)

    this.createModel()
    super(options)
  }

}

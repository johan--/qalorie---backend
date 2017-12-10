import Model from "./model"
import BaseManager from "app/base/manager"
var moment = require('moment')

export default class NutritionistFilesManager extends BaseManager{

  constructor(options){
    this.model = new Model()
  }
}

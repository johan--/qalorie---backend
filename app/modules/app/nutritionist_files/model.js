import BaseModel from "app/base/model"
import Promise from "bluebird"
import path from 'path'

var moment = require('moment')

var mongoose = Promise.promisifyAll(require('mongoose'))

let schema = {
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  created: {type: Date },
}

var attachments = Promise.promisifyAll(require('mongoose-attachments-localfs'));
var uploads_base = path.join(__dirname, "../../webserver/public/");
var rel_path = "/uploads/nutritionist/files"
var uploads = path.join(uploads_base, rel_path);


export default class NutritionistFiles extends BaseModel {
  constructor(options){
    this._name = "nutritionist_files" //TODO: Use introspection to not need this (at least get filename programatically)
    this._schema = new mongoose.Schema(schema)
    this._schema.index({ user : 1, created: 1 })
    this._schema.pre('save', this.preSave)
    this._schema.set('toObject', {
      getters: true,
      virtuals: true
    })
    this._schema.set('toJSON', {
      virtuals: true
    })

    // TODO: replace mongoose-attachment with mongoose-crate: https://github.com/achingbrain/mongoose-crate
    this._schema.plugin(attachments, {
        directory: uploads,
        storage : {
            providerName: 'localfs'
        },
        properties: {
            file: {
                styles: {
                    original: {
                        // keep the original file
                    },
                    thumb: {
                      thumbnail: '100x100^',
                      gravity: 'center',
                      extent: '100x100',
                      '$format': 'jpg'
                    }
                }
            }
        }
    });

    this._schema.virtual('file_original').get(function() {
      if (!this.file || !this.file.original || !this.file.original.path) return '';
      return `${path.join(`${rel_path}/original`, path.basename(this.file.original.path))}?t=${moment(this.modified).unix()}`;
    });
    this._schema.virtual('file_thumb').get(function() {
      if (!this.file || !this.file.thumb || !this.file.thumb.path) return '';
      return `${path.join(`${rel_path}/thumb`, path.basename(this.file.thumb.path))}?t=${moment(this.modified).unix()}`;
    });

    this.createModel()
    super(options)
  }

  preSave(next) {
    // this should be the model instance not the BaseModel intanse
    if (this.isNew){
      this.created = moment().format('YYYY/MM/DD')
    }
    next()
  }

  postSave() {
  }

}

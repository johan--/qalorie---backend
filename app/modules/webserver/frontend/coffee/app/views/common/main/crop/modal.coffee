class App.Views.Common.Main.Crop.Modal extends Null.Views.Base
  template: JST['app/common/main/crop/modal.html']

  dafaults:
    crop_w: 250
    crop_h: 170

  initialize: (options) =>
    super
    @options =
      crop_w: @dafaults.crop_w
      crop_h: @dafaults.crop_h

    _.extend @options, options
    @crop_data

    return this

  events:
    'click [data-role=upload_and_crop]': 'onUploadAndCrop'
    'click [data-role=close]': 'onUploadCancel'
    'shown.bs.modal .modal': 'initCrop'
    'click .crop-actions button': 'onCropAction'

  render: () =>
    super

    $('.modal', @$el).modal({
      keyboard: false
      backdrop: 'static'
      show: false
    })
    $('.modal').on('hidden.bs.modal', @remove)
    $('.modal').on('show.bs.modal', () ->
       $(this).find('.modal-content').css({
         width:'auto', #probably not needed
         height:'auto', #probably not needed
         'max-height':'100%'
        })
    );

    return this

  loadFile: (input) =>
    if input.files and input.files[0]
      reader = new FileReader()
      reader.onload = (e) =>
        $('img[data-role=image-preview]', @$el).attr('src', e.target.result)
        @fire "crop:load"
        @show()

      reader.readAsDataURL(input.files[0])

  show: () =>
    $('.modal', @$el).modal 'show'

  initCrop: () =>
    
    $('.crop-preview-container').height(@options.crop_h)

    image = $('img[data-role=image-preview]', @$el)[0]
    options = {
      aspectRatio: @options.crop_w / @options.crop_h,
      preview: '.crop-preview',
      zoomOnWheel: false,
      crop: @cropModal
    };
    @cropper = new Cropper(image, options);

  onCropAction: (e) =>
    target = e.currentTarget
    data = {
      method: $(target).data('method'),
      target: $(target).data('target'),
      option: $(target).data('option'),
      secondOption: $(target).data('second-option')
    };

    @cropper[data.method](data.option, data.secondOption);

  hide: () ->
    $('.modal', @$el).modal('hide')

  cropModal: (e) =>
    data = e.detail;
    @crop_data = {
      x: data.x,
      y: data.y,
      x2: data.x + data.width,
      y2: data.y + data.height,
      w: data.width,
      h: data.height,
      sw: @options.crop_w,
      sh: @options.crop_h,
      rotate: data.rotate
    }

  onUploadAndCrop: (event) =>
    
    @fire "upload_file"

  onUploadCancel: (event) =>
    @fire 'canceled'
    @hide()

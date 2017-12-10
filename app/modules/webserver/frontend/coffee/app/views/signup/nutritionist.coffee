class App.Views.Signup.Nutritionist extends Null.Views.Base
  template: JST['app/signup/nutritionist.html']

  events:
    'change input[type=text]': 'onChangeField'
    'change textarea': 'onChangeField'
    'change.bfhselectbox .bfh-selectbox': 'onChangeField'
    'click #next-step': 'onNextStep'
    'change input[type=file]': 'onFileChange'
    'click .file-selected': 'onFileRemove'

  initialize: ->
    @dob = new Date

  getContext: ->
    return {
      user: app.me
    }

  render: ->
    super

    @renderSelectbox()

    return this

  renderSelectbox: ->
    _.each($('.bfh-selectbox'), (e) =>
      sb_id = $(e).attr('id')
      console.log(sb_id)
      
      $('.bfh-selectbox[data-id=' + sb_id + ']').bfhselectbox({
        value: app.me.get(sb_id)
      })
    )

  onFileChange: (event) ->
    input = event.target
    if input.files and input.files[0]
      reader = new FileReader()
      reader.onload = (e) =>
        file_container = $(input).parent();
        $(file_container).append('<img src="' + e.target.result + '">')
        $(file_container).addClass('file-selected')
        if ($(file_container).parent().hasClass('file-certificate'))
          $(file_container).parent().data('count', $(file_container).parent().data('count') + 1)
          $(file_container).parent().append('<div class="new-file-add"><input type="file" name="certificate"></div>')

      reader.readAsDataURL(input.files[0])

  onFileRemove: (event) ->
    file_container = $(event.target)
    $(file_container).find('img').remove()
    $(file_container).removeClass('file-selected')
    $(file_container).find('input[type=file]').val('')
    if ($(file_container).parent().hasClass('file-certificate'))
      $(file_container).remove()


  onChangeField: (event) ->
    changed = event.currentTarget
    value = @$(event.currentTarget).val()

    obj = {}
    if changed.name
      obj[changed.name] = if $(event.currentTarget).is(':checkbox') then $(event.currentTarget).is(':checked') else value
    else if $(changed).hasClass('date')
      map = {
        month: 'setMonth'
        year: 'setFullYear'
        days: 'setDate'
      }
      @dob[map[$(event.currentTarget).data('name')]](parseInt(value)) unless isNaN(parseInt(value))
      obj['dob'] = @dob
    else
      obj[$(event.currentTarget).data('name')] = value

    app.me.set(obj)

  onNextStep: =>
    instance = @
    if @checkValidation()

      app.me.set 'profileFilled', true
      app.me.save {},
        success: (model, data, xhr) ->
          unless data.error
            instance.uploadCertificateFiles()

  uploadCertificateFiles: () ->
    instance = @
    $('#certificates-form', @$el).ajaxSubmit({
      url: app.me.url()
      type: "PUT"
      success: (data, xhr) =>
        instance.uploadLicenseCopy()
      error: =>
        $('.pd-right_0 .selfie', @$el).unblock()
        console.log "errors: ", arguments
    });

  uploadLicenseCopy: () ->
    $('#license-copy-form', @$el).ajaxSubmit({
      url: app.me.url()
      type: "PUT"
      success: (data, xhr) =>
        window.location.href = "/"
      error: =>
        $('.pd-right_0 .selfie', @$el).unblock()
        console.log "errors: ", arguments
    });

  validateEmail:(email)->
    re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);

  checkValidation:()->
    @clearMessages()
    valid=true
    
    _.each($('.bfh-selectbox, input[type=text], input[type=file], textarea'), (e) =>
      f_id = $(e).attr('id')
      f_value = $('#' + f_id).val()

      if f_value == "" || (f_id == 'email' && !@validateEmail(f_value))
        valid = false

        if $('#' + f_id).hasClass('date')
          $('#birthday_error').show()
        else
          $('#' + f_id + '_error').show()

        $('#' + f_id).addClass('error')
        $('#' + f_id + ' a').addClass('error')
    )
    
    return valid

  clearMessages:()->
    _.each($('.bfh-selectbox, input[type=text], input[type=file], textarea'), (e) =>
      f_id = $(e).attr('id')
      
      $('#' + f_id + '_error').hide()
      $('#birthday_error').hide()
      $('#' + f_id).removeClass('error')
      $('#' + f_id + ' a').removeClass('error')
    )


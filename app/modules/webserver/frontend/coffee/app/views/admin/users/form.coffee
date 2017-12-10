class App.Views.Admin.Users.Form extends Null.Views.Base
  template: JST['app/admin/users/form.html']

  initialize: (options) =>
    super

  events:
    'click .save': 'saveUser'
    'click .cancel': 'cancelUser'

  render: () =>
    super

  getContext: () =>
    {model: @model}

  saveUser: () =>
    @model.set('first_name', $('#first_name', @$el).val())
    @model.set('last_name', $('#last_name', @$el).val())
    @model.set('email', $('#email', @$el).val())

    is_admin = false
    is_nutritionist = false

    if $('#role', @$el).val() == 'admin'
      is_admin = true
    else if $('#role', @$el).val() == 'nutritionist'
      is_nutritionist = true

    @model.set('is_admin', is_admin)
    @model.set('is_nutritionist', is_nutritionist)

    $('#page-users .edit-form').block()

    @model.save {},
      success: =>
        $('#page-users .edit-form').unblock()
        $.notify.defaults({ className: "success" })
        $.notify("You've succesfully updated user's information.", {globalPosition: 'top right'})

  cancelUser: () =>
    $('#page-users .edit-form').fadeOut('slow', () =>
      $('#page-users .list').fadeIn('slow', () =>
        @fire 'list:refresh'
      )
    )


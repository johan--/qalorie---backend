class App.Views.Admin.Users.Row extends Null.Views.Base
  template: JST['app/admin/users/row.html']
  tagName: 'tr'

  initialize: (options) =>
    super

  events:
    'click .edit': 'editItem'

  render: () =>
    super

  getContext: () =>
    {model: @model}

  editItem: (event) =>
    event.preventDefault()
    @form = new App.Views.Admin.Users.Form
      model: @model

    $('#page-users .list').fadeOut('slow', () =>
      @addView @form.render(), $('#page-users .edit-form')
      $('#page-users .edit-form').fadeIn('slow')
    )



class App.Views.Admin.Nutritionists.Row extends Null.Views.Base
  template: JST['app/admin/nutritionists/row.html']
  tagName: 'tr'

  initialize: (options) =>
    super

  events:
    'click .view': 'viewItem'

  render: () =>
    super

  getContext: () =>
    {model: @model}

  viewItem: (event) =>
    event.preventDefault()
    @view = new App.Views.Admin.Nutritionists.View
      model: @model

    $('#page-nutritionists .tabs-nutritionists').fadeOut('slow', () =>
      @addView @view.render(), $('#page-nutritionists .view-form')
      $('#page-nutritionists .view-form').fadeIn('slow')
    )



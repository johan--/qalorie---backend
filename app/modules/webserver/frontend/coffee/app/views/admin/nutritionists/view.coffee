class App.Views.Admin.Nutritionists.View extends Null.Views.Base
  template: JST['app/admin/nutritionists/view.html']

  initialize: (options) =>
    super

  events:
    'click .accept': 'acceptUser'
    'click .decline': 'declineUser'
    'click .suspend': 'suspendUser'
    'click .activate': 'activateUser'
    'click .remove': 'removeUser'
    'click .cancel': 'cancelUser'

  render: () =>
    super
    $('.fancybox').fancybox({
      maxWidth: '80%',
      maxHeight: '80%'
    })

    return this

  getContext: () =>
    {model: @model}

  acceptUser: () =>
    @model.set('verification', 'accept')
    
    $('#page-nutritionists .view-form').block()

    @model.save {},
      success: =>
        $('#page-nutritionists .view-form').unblock()
        $.notify.defaults({ className: "success" })
        $.notify("Accepted this nutritionist.", {globalPosition: 'top right'})
        @fire "list:update"

  declineUser: () =>
    @model.set('verification', 'decline')
    
    $('#page-nutritionists .view-form').block()

    @model.save {},
      success: =>
        $('#page-nutritionists .view-form').unblock()
        $.notify.defaults({ className: "error" })
        $.notify("Declined this nutritionist.", {globalPosition: 'top right'})
        @fire "list:update"

  suspendUser: () =>
    @model.set('verification', 'suspend')
    
    $('#page-nutritionists .view-form').block()

    @model.save {},
      success: =>
        $('#page-nutritionists .view-form').unblock()
        $.notify.defaults({ className: "error" })
        $.notify("Suspend this nutritionist.", {globalPosition: 'top right'})
        @fire "list:update"

  activateUser: () =>
    @model.set('verification', 'activate')
    
    $('#page-nutritionists .view-form').block()

    @model.save {},
      success: =>
        $('#page-nutritionists .view-form').unblock()
        $.notify.defaults({ className: "success" })
        $.notify("Activate this nutritionist.", {globalPosition: 'top right'})
        @fire "list:update"

  removeUser: () =>
    @model.set('verification', 'remove')
    
    $('#page-nutritionists .view-form').block()

    @model.save {},
      success: =>
        $('#page-nutritionists .view-form').unblock()
        $.notify.defaults({ className: "success" })
        $.notify("Removed this nutritionist.", {globalPosition: 'top right'})
        @fire "list:update"
        $('#page-nutritionists .view-form').fadeOut('slow', () =>
          $('#page-nutritionists .tabs-nutritionists').fadeIn('slow', () =>
            #@fire 'list:refresh'
          )
        )

  cancelUser: () =>
    $('#page-nutritionists .view-form').fadeOut('slow', () =>
      $('#page-nutritionists .tabs-nutritionists').fadeIn('slow', () =>
        #@fire 'list:refresh'
      )
    )


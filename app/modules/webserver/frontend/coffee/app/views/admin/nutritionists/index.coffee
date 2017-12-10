class App.Views.Admin.Nutritionists.Index extends Null.Views.Base
  template: JST['app/admin/nutritionists/index.html']

  initialize: (options) =>
    super

    @on 'list:update', @updateAllTabs

    @approved = new App.Views.Admin.Nutritionists.Table
      container: 'approved'

    @unapproved = new App.Views.Admin.Nutritionists.Table
      container: 'unapproved'

    @suspended = new App.Views.Admin.Nutritionists.Table
      container: 'suspended'

    @declined = new App.Views.Admin.Nutritionists.Table
      container: 'declined'

  render: () =>
    super

    @appendView @approved.render(), '#bf-approved .list'
    @appendView @unapproved.render(), '#bf-unapproved .list'
    @appendView @suspended.render(), '#bf-suspended .list'
    @appendView @declined.render(), '#bf-declined .list'

  updateAllTabs: =>
  	@approved.refresh()
  	@unapproved.refresh()
  	@suspended.refresh()
  	@declined.refresh()

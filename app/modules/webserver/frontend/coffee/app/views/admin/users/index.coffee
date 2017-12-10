class App.Views.Admin.Users.Index extends Null.Views.Base
  template: JST['app/admin/users/index.html']

  initialize: (options) =>
    super

    @collection = new App.Collections.Users()

    @table = new App.Views.Admin.Users.Table
      collection: @collection

  render: () =>
    super

    @appendView @table.render(), '.list'


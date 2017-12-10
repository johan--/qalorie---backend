class App.Views.Admin.Page extends Null.Views.BasePage

  initialize: (opts) =>
    super

    @left_bar = new App.Views.Admin.LeftBar


  render: () =>
    # roster left item
    @addView @left_bar.render(), "[data-role=left-bar]"

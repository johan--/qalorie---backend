class App.Routers.Admin extends Null.Routers.Base
  routes:
    '': 'dashboard',
    'users': 'users',
    'nutritionists': 'nutritionists',
    'activities': 'activities'


  page_class: App.Views.Admin.Page

  $a = $("<a>")
  $a.attr('href', "")
  $a.data('role', 'route')

  dashboard: =>
    @selectNav('')
    $a.html("Dashboard")
    $('[data-role="breadcrum"]').html($a)
    app.loadPage App.Views.Admin.Dashboard.Index, {el: "[data-role=main]"}

  users: =>
    @selectNav('users')
    $a.html("Users")
    $('[data-role="breadcrum"]').html($a)
    app.loadPage App.Views.Admin.Users.Index, {el: "[data-role=main]"}

  nutritionists: =>
    @selectNav('nutritionists')
    $a.html("Nutritionists")
    $('[data-role="breadcrum"]').html($a)
    app.loadPage App.Views.Admin.Nutritionists.Index, {el: "[data-role=main]"}

  activities: =>
    @selectNav('activities')
    $a.html("Activities")
    $('[data-role="breadcrum"]').html($a)
    app.loadPage App.Views.Admin.Activities.Index, {el: "[data-role=main]"}




class App.Routers.Signup extends Null.Routers.Base
  routes:
    'info': 'info',
    'life': 'life',
    'preferences': 'preferences',
    'plan': 'plan',
    'suggest': 'suggest',
    'nutritionist': 'nutritionist',


  page_class: App.Views.Signup.Page

  $a = $("<a>")
  $a.attr('href', "")
  $a.data('role', 'route')

  info: =>
    app.loadPage App.Views.Signup.Info, {el: "[data-role=main]"}
    @scrollTop()

    ga('set', 'page', '/signup-progress-info');
    ga('send', 'pageview');

    fbq('track', "PageView");

  life: =>
    app.loadPage App.Views.Signup.Life, {el: "[data-role=main]"}
    @scrollTop()

    ga('set', 'page', '/signup-progress-life');
    ga('send', 'pageview');

    fbq('track', "PageView");

  preferences: =>
    app.loadPage App.Views.Signup.Preferences, {el: "[data-role=main]"}
    @scrollTop()

    ga('set', 'page', '/signup-progress-preferences');
    ga('send', 'pageview');

    fbq('track', "PageView");

  plan: =>
    app.loadPage App.Views.Signup.ChoosePlan, {el: "[data-role=main]"}
    @scrollTop()

    ga('set', 'page', '/signup-progress-plan');
    ga('send', 'pageview');

    fbq('track', "PageView");

  suggest: =>
    app.loadPage App.Views.Signup.Suggest, {el: "[data-role=main]"}
    @scrollTop()

    ga('set', 'page', '/signup-progress-suggest');
    ga('send', 'pageview');

    fbq('track', "PageView");
    fbq('track', 'Purchase', {value: '0.00', currency:'USD'});

  nutritionist: =>
    app.loadPage App.Views.Signup.Nutritionist, {el: "[data-role=main]"}
    @scrollTop()

    ga('set', 'page', '/signup-progress-nutritionist');
    ga('send', 'pageview');

    fbq('track', "PageView");

  scrollTop: =>
    $('body').scrollTop(0)

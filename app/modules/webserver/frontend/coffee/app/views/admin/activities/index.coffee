class App.Views.Admin.Activities.Index extends Null.Views.Base
  template: JST['app/admin/activities/index.html']

  initialize: (options) =>
    super

    @sections = [
      new App.Views.Admin.Activities.Signup.Index({
        id: 'signup'
        name: 'Sign Up'
        collection: new App.Collections.Users
        filter:
          limit: 10
          offset: 0
          profileFilled: true
          activity_group: 'daily'
      }),
      new App.Views.Admin.Activities.Page.Index({
        id: 'dashboard'
        name: 'Dashboard'
        collection: new App.Collections.UserActivities
        filter:
          limit: 10
          offset: 0
          activity: 'dashboard'
          sort: {
            created: -1
          }
      }),
      new App.Views.Admin.Activities.Page.Index({
        id: 'status'
        name: 'Status'
        collection: new App.Collections.UserActivities
        filter:
          limit: 10
          offset: 0
          activity: 'status'
          sort: {
            created: -1
          }
      }),
      new App.Views.Admin.Activities.Page.Index({
        id: 'progress'
        name: 'Progress'
        collection: new App.Collections.UserActivities
        filter:
          limit: 10
          offset: 0
          activity: 'progress'
          sort: {
            created: -1
          }
      }),
      new App.Views.Admin.Activities.Page.Index({
        id: 'food'
        name: 'Food'
        collection: new App.Collections.UserActivities
        filter:
          limit: 10
          offset: 0
          activity: 'food'
          sort: {
            created: -1
          }
      }),
      new App.Views.Admin.Activities.Page.Index({
        id: 'exercises'
        name: 'Exercise'
        collection: new App.Collections.UserActivities
        filter:
          limit: 10
          offset: 0
          activity: 'exercises'
          sort: {
            created: -1
          }
      }),
      new App.Views.Admin.Activities.Page.Index({
        id: 'nutritionist'
        name: 'Nutritionist'
        collection: new App.Collections.UserActivities
        filter:
          limit: 10
          offset: 0
          activity: 'nutritionist'
          sort: {
            created: -1
          }
      }),
      new App.Views.Admin.Activities.Page.Index({
        id: 'delete_account'
        name: 'Delete Account'
        collection: new App.Collections.UserActivities
        filter:
          limit: 10
          offset: 0
          activity: 'delete_account'
          sort: {
            created: -1
          }
    })]

    return this

  render: () =>
    super

    for section, i in @sections
      @loadSection section
      
    $('#accordion', @$el).accordion({
      collapsible: true,
      heightStyle: "content"
    });

    return this

  loadSection: (section) =>
    $h3 = $('<h3><span class="icon-section icon-small-' + section.id + '"></span>' + section.name + ' (<span class="section-count" data-role="activity-count-' + section.id + '">0</span>)</h3>')
    $('[data-role="sections"]', @$el).append($h3)
    @appendView section.render(), '[data-role="sections"]'

class App.Views.Admin.Activities.Signup.Row extends Null.Views.Base
  template: JST['app/admin/activities/signup/row.html']
  tagName: 'tr'

  initialize: (options) =>
    super
    @activity_group = options.activity_group
    @model = options.model

    if @activity_group == 'daily'
      @model.date = moment(@model._id.year + '-' + @model._id.month + '-' + @model._id.day).format('YYYY-MM-DD')
    else if @activity_group == 'monthly'
      @model.date = moment(@model._id.year + '-' + @model._id.month).format('YYYY-MM')
    else if @activity_group == 'yearly'
      @model.date = @model._id.year
    else if @activity_group == 'weekly'
      if @model._id.week < 10
        @model._id.week = '0' + @model._id.week
      _week = moment(@model._id.year + '-W' + @model._id.week)
      @model.date = _week.format('YYYY-MM-DD') + '   ~   ' + _week.weekday(7).format('YYYY-MM-DD')

  render: () =>
    super

  getContext: () =>
    {model: @model, activity_group: @activity_group}


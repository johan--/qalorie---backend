class App.Views.Admin.Activities.Signup.Index extends Null.Views.Base
  template: JST['app/admin/activities/signup/index.html']

  initialize: (options) =>
    super

    @id = options.id
    @name = options.name
    @filter = options.filter

    @collection.fetch({
      data: @filter
    })

    @listenTo @collection, 'sync', @addAll

  events:
    'click .actions .prev': 'onPrev'
    'click .actions .next': 'onNext'
    'click .filter-user button': 'onFilter'

  render: () =>
    super

  addAll: () =>
    
    $('.section', @$el).unblock()

    $('.actions span', @$el).html @filter.offset + ' - ' + (@filter.offset + @filter.limit)
    $('tbody', @$el).html ''

    if @filter.offset > 0
      $('.actions .prev', @$el).attr('disabled', false)
    else
      $('.actions .prev', @$el).attr('disabled', true)

    if @collection.length < @filter.limit
      $('.actions .next', @$el).attr('disabled', true)
    else
      $('.actions .next', @$el).attr('disabled', false)

    if @collection.total == @filter.offset + @filter.limit
      $('.actions .next', @$el).attr('disabled', true)

    @collection.each @addOne

    $('#accordion').accordion("refresh")
    $('[data-role="activity-count-' + @id + '"]').html @collection.total

  addOne: (item) =>
    item_view = new App.Views.Admin.Activities.Signup.Row
      model: item
      activity_group: @filter.activity_group
      
    @appendView item_view.render(), 'tbody'

  onPrev: () =>
    @filter.offset -= @filter.limit
    if (@filter.offset < 0)
      @filter.offset = 0

    @getList()

  onNext: () =>
    @filter.offset += @filter.limit

    @getList()

  onFilter: () =>
    @filter.offset = 0
    query = $('.filter-user #group', @$el).val()

    @filter.activity_group = query

    @getList()

  getList: () =>
    $('.section', @$el).block()
    @collection.fetch({
      data: @filter
    })



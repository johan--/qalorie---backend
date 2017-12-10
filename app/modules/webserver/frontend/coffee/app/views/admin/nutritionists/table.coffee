class App.Views.Admin.Nutritionists.Table extends Null.Views.Base
  template: JST['app/admin/nutritionists/table.html']

  initialize: (options) =>
    super

    @collection = new App.Collections.Users()
    @container = options.container

    @filter = {
      limit: 10,
      offset: 0,
      sort: {
        created: -1
      },
      profileFilled: true,
      is_nutritionist: true,
      is_active: true,
      is_decline: false,
      is_suspend: false,
    }

    if @container == 'unapproved'
      @filter.is_active = false
    else if @container == 'suspended'
      @filter.is_active = false
      @filter.is_suspend = true
    else if @container == 'declined'
      @filter.is_active = false
      @filter.is_decline = true

    app.authorization.isAuthorized("User:read", app.me.toJSON(), {}, (result) =>
      @collection.fetch({
        data: @filter
      })
    )

    @listenTo @collection, 'sync', @addAll

    @on 'list:refresh', @refresh

  events:
    'click .actions .prev': 'onPrev'
    'click .actions .next': 'onNext'
    'click .search-user button': 'onSearch'

  render: () =>
    super

  addAll: () =>
    $('#page-nutritionists #bf-' + @container + ' .list').unblock()

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

  addOne: (item) =>
    item_view = new App.Views.Admin.Nutritionists.Row
      model: item
      subject: app.me.toJSON()
      
    @appendView item_view.render(), 'tbody'

  onPrev: () =>
    @filter.offset -= @filter.limit
    if (@filter.offset < 0)
      @filter.offset = 0

    @getList()

  onNext: () =>
    @filter.offset += @filter.limit

    @getList()

  onSearch: () =>
    @filter.offset = 0
    query = $('.search-user #email', @$el).val()
    if query != ''
      @filter.search = query
    else
      delete @filter.search

    @getList()

  getList: () =>
    $('#page-nutritionists #bf-' + @container + ' .list').block()
    @collection.fetch({
      data: @filter
    })

  refresh: () =>
    @onSearch()



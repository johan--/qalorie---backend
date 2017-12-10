class App.Views.Admin.Users.Table extends Null.Views.Base
  template: JST['app/admin/users/table.html']

  initialize: (options) =>
    super

    @filter = {
      limit: 10,
      offset: 0,
      sort: {
        created: -1
      },
      profileFilled: true
    }

    app.authorization.isAuthorized("User:read", app.me.toJSON(), {}, (result) =>
      @collection.fetch({
        data: @filter
      })
    )

    @listenTo @collection, 'sync', @addAll

    @on 'list:refresh', @addAll

  events:
    'click .actions .prev': 'onPrev'
    'click .actions .next': 'onNext'
    'click .search-user button': 'onSearch'

  render: () =>
    super

  addAll: () =>
    $('#page-users .list').unblock()

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
    item_view = new App.Views.Admin.Users.Row
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
    $('#page-users .list').block()
    @collection.fetch({
      data: @filter
    })



class App.Views.Main.Exercises.Widgets.ExerciseLogItem extends Null.Views.Base
  template: JST['app/main/exercises/widgets/search/recent.html']
  tagName: 'li'

  initialize: (options) =>
    super

  events:
    'ifChecked .ratings input': 'onChecked'
    'ifUnchecked .ratings input': 'onUnhecked'

  render: () =>
    super

  onChecked: ->
    favorite = new App.Models.Favorite(type: 'exercise', object: @model.id)
    @options.favorites.create favorite, wait: true

  onUnhecked: ->
    list = @options.favorites.where object: @model.id
    that = this
    list.forEach (object) ->
      object.destroy
        success: ->
          that.options.favorites.remove(object)

  getContext: =>
    return { model: @model, favorites: @options.favorites.pluck 'object' }
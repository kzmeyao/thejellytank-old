var WorksView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.template = Handlebars.compile($("#works-view-template").html());
  },

  render : function() {
    this.$el.append(this.template());
  },

  remove : function() {
    this.$el.empty();
  }
});
var WorksView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.template = Handlebars.compile($("#works-view-template").html());
    this.collection = new Works();
  },

  render : function() {
    this.collection.fetch(this.$el, this.template);
  },

  remove : function() {
    this.$el.empty();
  }
});
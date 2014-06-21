var HelloView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.template = Handlebars.compile($("#hello-view-template").html());
  },

  render : function() {
    $(".hello-view").append(this.template());
  }
});
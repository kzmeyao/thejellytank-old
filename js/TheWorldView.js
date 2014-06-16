var TheWorldView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.ocean = new OceanView({el : "header"});
    this.render();
  },

  render : function() {
  }
});
var TheWorldView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.ocean = new OceanView({el : "header"});
    this.render();
  },

  render : function() {
    var $theWorld = $(".the-world");
    TweenLite.to($theWorld, 1, {y : "-10px"});
    TweenLite.to($theWorld, 1, {autoAlpha : "1"});
  }
});
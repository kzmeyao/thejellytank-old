var OceanView = Backbone.View.extend({

  events: {
    "click .nav-home" : "goHome",
    "click .nav-works" : "goWork",
    "click .nav-hello" : "sayHello"
  },

  initialize : function() {
    this.render();
  },

  render : function() {
    TweenLite.to($("#jelly"), 0, {scale : 2.5});
  },

  goHome : function() {
    console.log("You're home");
  },

  goWork : function() {
    console.log("You're working");
  },

  sayHello : function() {
    console.log("Sup");
  }
});
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
    var $jelly = $("#jelly"),
      tl = new TimelineLite();
    tl.to($jelly, 1, {scale : 2.5})
      .to($jelly, 1, {autoAlpha: 1});
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
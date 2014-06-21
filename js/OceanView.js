var OceanView = Backbone.View.extend({

  events: {
    "click .nav-home" : "goHome",
    "click .nav-works" : "goWork",
    "click .nav-hello" : "sayHello",
    "click .logo" : "goHome",
    "mouseover .logo"  : "logoHover",
    "click .unleash" : "unleash"
  },

  initialize : function() {

  },

  render : function() {
    var image = new Image();
    image.src = "../images/splash.jpg";
    image.onload = function() {
      $(".backgroundsize header").css('background', "url(" + image.src + ") no-repeat center center scroll");
      var $jelly = $("#jelly"),
          tl = new TimelineLite();
      tl.to($jelly, 1, {scale : 2.5})
        .to($jelly, 1, {autoAlpha: 1});
    };
  },

  logoHover: function(e) {
    if(!this.hovering) {
      var that = this;
      that.hovering = true;
      var $target = $(e.currentTarget).find(".tentacles");
      var tl = new TimelineLite();
      tl.to($target, .7, {y : "-2.5", ease:Circ.easeIn})
        .to($target, .7, {y : "0", ease:Circ.easeOut, onComplete: function(){that.hovering = false;}});
    }
  },

  goHome : function() {

  },

  unleash: function() {
    console.log("Unleash the jellies");
  },

  goWork : function() {

  },

  sayHello : function() {
    console.log("Sup");
  }
});
var CloudView = Backbone.View.extend({
  events: {
    "click .cloud-logo" : "goHome",
    "click .cloud-nav-works" : "goWork",
    "click .cloud-nav-hello" : "sayHello"
  },

  initialize : function(options) {
    this.template = Handlebars.compile($("#cloud-template").html());
  },

  render : function(type, id) {
    if (type == "photo") {
      this.$el.addClass("cloudy");
      this.$el.append(this.template());
      var $jelly = $("#cloud-jelly"),
        tl = new TimelineLite();
      tl.to($jelly, 1, {scale : 2.5})
        .to($jelly, 1, {autoAlpha: 1});
    } else {

    }
  },

  goHome : function() {
    this.close();
    App.navigate("", {trigger : true});
  },

  goWork : function() {
    this.close();
    App.navigate("works", {trigger : true});
  },

  sayHello : function() {
    this.close();
    App.navigate("hello", {trigger : true});
  },

  close : function() {
    this.$el.removeClass("cloudy");
    this.$el.find(".cloud").remove();
  }
});
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "home",
    "works" : "works",
    "hello" : "hello"
  },

  home : function() {
    if(!this.view) {
      this.view = new TheWorldView({el : "body"});
    }
  },

  works : function() {
    if(!this.view) {
      this.view = new TheWorldView({el : "body"});
    }
  },

  hello : function() {
    if(!this.view) {
      this.view = new TheWorldView({el : "body"});
    }
  }
});

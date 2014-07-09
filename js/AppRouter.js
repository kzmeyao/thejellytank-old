var AppRouter = Backbone.Router.extend({
  routes: {
    "": "home",
    "works" : "works",
    "hello" : "hello",
    "photo/:id" : "photo"
  },

  home : function() {
    if(!this.view) {
      this.view = new TheWorldView({el : "body"});
      this.view.render();
    }
    this.view.goHome();
  },

  works : function() {
    if(!this.view) {
      this.view = new TheWorldView({el : "body"});
      this.view.render();
    }
    this.view.goWork();
  },

  hello : function() {
    if(!this.view) {
      this.view = new TheWorldView({el : "body"});
      this.view.render();
    }
    this.view.sayHello();
  },

  photo : function(id) {
    if(!this.view) {
      this.view = new TheWorldView({el : "body"});
      this.view.render();
    }
    this.view.takePicture(id);
  }
});

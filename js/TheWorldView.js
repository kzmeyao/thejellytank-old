var TheWorldView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.ocean = new OceanView({el : "header"});

    var that = this;
    var scrollHandler = function() {
      that.didScroll = true;
    };

    $(window).scroll(scrollHandler);

    this.scrollInterval = setInterval(function() {
      if (that.didScroll) {
        that.didScroll = false;

        var $navOverlay = $("nav .overlay");
        var scrollTop = $(window).scrollTop();
        var headerHeight = $("header").outerHeight();
        if (scrollTop < headerHeight) {
          TweenLite.to($navOverlay, 0.5, {autoAlpha: 0});
        } else {
          TweenLite.to($navOverlay, 0.5, {autoAlpha: 1});
        }
      }
    }, 250);

    this.worksView = new WorksView({el : ".works-view"});
    this.helloView = new HelloView({el : ".hello-view"});
    this.render();
  },

  render : function() {
    this.ocean.render();
    this.worksView.render();
  }
});
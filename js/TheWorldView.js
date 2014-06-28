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
        if (that.persist && scrollTop < headerHeight) {
          that.persist = false;
          TweenLite.to($navOverlay, 0.3, {height: "8%"});
        } else if (!that.persist && scrollTop > headerHeight) {
          that.persist = true;
          TweenLite.to($navOverlay, 0.3, {height: "100%"});
        }
      }
    }, 250);

    this.worksView = new WorksView({el : "#works"});
    this.helloView = new HelloView({el : "#hello"});
    this.render();
  },

  render : function() {
    this.ocean.render();
    this.worksView.render();
    this.helloView.render();
  }
});
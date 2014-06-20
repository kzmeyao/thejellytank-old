var TheWorldView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.ocean = new OceanView({el : "header"});
    var that = this;
    that.persistHeader = false;
    $(window).scroll(function() {
      that.didScroll = true;
    });

    this.scrollInterval = setInterval(function() {
      if (that.didScroll) {
        that.didScroll = false;
        var scrollTop = $(window).scrollTop();
        if (!that.persistHeader && scrollTop > 5) {
          that.persistHeader = true;
          $("header").addClass("fixed");
        } else if(that.persistHeader && scrollTop < 5) {
          that.persistHeader = false;
          $("header").removeClass("fixed");
        }
      }
    }, 250);
    this.worksView = new WorksView({el : ".works-page"});
    this.helloView = new HelloView({el : ".works-page"});
    this.render();
  },

  render : function() {
    this.ocean.render();
    this.worksView.render();
    this.helloView.render();
  }
});
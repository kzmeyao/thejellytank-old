var TheWorldView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.ocean = new OceanView({el : "header"});

    var that = this;
    that.persistHeader = false;
//    var scrollHandler = function() {
//      that.didScroll = true;
//    };
//
//    $(window).scroll(scrollHandler);

//    this.scrollInterval = setInterval(function() {
//      if (that.didScroll) {
//        that.didScroll = false;
//
//        var $header = $("header");
//        var scrollTop = $(window).scrollTop();
//        if (!that.persistHeader && scrollTop > 0) {
//          $(window).off("scroll", scrollHandler);
//          $header.addClass("fixed");
//          TweenLite.to(
//            $header,
//            0.4,
//            {height: $("nav").outerHeight(),
//             onComplete: function(){
//               $(window).scroll(scrollHandler);
//               that.persistHeader = true;
//             }
//            });
//        } else if(that.persistHeader && that.scrollTop < 1) {
//          that.persistHeader = false;
//          TweenLite.to(
//            $header,
//            0.4,
//            {height: "innerHeight" in window
//              ? window.innerHeight
//              : document.documentElement.offsetHeight,
//             onComplete: function(){$("header").removeClass("fixed");}});
//        }
//      }
//    }, 250);

    this.worksView = new WorksView({el : ".works-page"});
    this.helloView = new HelloView({el : ".works-page"});
    this.render();
  },

  render : function() {
    this.ocean.render();
  }
});
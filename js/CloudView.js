var CloudView = Backbone.View.extend({
  events: {
    "click .icon-cancel" : "close",
    "click #wrapper" : "close"
  },

  initialize : function(options) {
    this.template = Handlebars.compile($("#cloud-template").html());
    this.photos = options.works.photos;
    this.ratio = 598/900;
  },

  render : function(type, id) {
    this.$el.addClass("cloudy");
    this.$el.append(this.template());
    var $cloud = $(".cloud");
    var tl = new TimelineLite();
    var that = this;
    tl.to($cloud, 0.3, {autoAlpha : 0.99})
      .to($cloud, 0.3, {y: "-20", onComplete: function() {
        if (type == "photo") {
          if (that.photos.length === 0) {
            _500px.api('/photos', {feature: "user", username : "kzmeyao", image_size : "4", sort : "taken_at"}, function (response) {
              if (response.success) {
                $.each(response.data.photos, function(index, photo) {
                  if(photo.width > photo.height) {
                    that.photos.push(photo);
                  }
                });
                that.startTheShowFrom(id);
              } else {
                console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
              }
            });
          } else {
            that.startTheShowFrom(id);
          }
        } else {

        }
      }}, "-=0.3");
  },

  startTheShowFrom : function(id) {
    var that = this;
    var slides = [];
    var bodyW = $("body").width();
    this.w = bodyW > 900 ? 900 : bodyW;
    this.h = this.w * this.ratio;
    $.each(this.photos, function (index, photo) {
      slides.push({
        img: photo.image_url,
        width: that.w,
        height: that.h,
        id: photo.id
      });
      if (photo.id == id) {
        that.index = index;
      }
    });
    var p1 = slides.slice(0,this.index);
    var p2 = slides.slice(this.index);
    slides = p2.concat(p1);
    var	gallery,
      el,
      i,
      page;

    gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });
    for (i=0; i<3; i++) {
      page = i==0 ? slides.length-1 : i-1;
      el = document.createElement('img');
      el.className = 'loading';
      el.src = slides[page].img;
      el.width = slides[page].width;
      el.height = slides[page].height;
      el.setAttribute("data-id", slides[page].id);
      el.onload = function () { this.className = ''; };
      gallery.masterPages[i].appendChild(el);
    }

    gallery.onFlip(function () {
      App.navigate("photo/" + $(".swipeview-active img").data('id'));
      var el,
        upcoming,
        i;

      for (i=0; i<3; i++) {
        upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

        if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
          el = gallery.masterPages[i].querySelector('img');
          el.className = 'loading';
          el.src = slides[upcoming].img;
          el.width = that.w;
          el.height = that.h;
          el.setAttribute("data-id", slides[upcoming].id);
        }
      }
    });

    gallery.onMoveOut(function () {
      gallery.masterPages[gallery.currentMasterPage].className = gallery.masterPages[gallery.currentMasterPage].className.replace(/(^|\s)swipeview-active(\s|$)/, '');
    });

    gallery.onMoveIn(function () {
      var className = gallery.masterPages[gallery.currentMasterPage].className;
      /(^|\s)swipeview-active(\s|$)/.test(className) || (gallery.masterPages[gallery.currentMasterPage].className = !className ? 'swipeview-active' : className + ' swipeview-active');
    });

    $(window).resize(function() {
      var bodyW = $("body").width();
      that.w = bodyW > 900 ? 900 : bodyW;
      that.h = that.w * that.ratio;
      var images = $(".cloud img");
      $.each(images, function(index, img) {
        img.setAttribute("width", that.w);
        img.setAttribute("height", that.h);
      });
    });
  },

  close : function(e) {
    if (e.target.tagName == "IMG") {
      return;
    }
    $(window).off("resize");
    var $cloud = $(".cloud");
    var tl = new TimelineLite();
    $("#wrapper").remove();
    var that = this;
    tl.to($cloud, 0.3, {autoAlpha : 0})
      .to($cloud, 0.3, {y: "20", onComplete: function() {
        that.$el.removeClass("cloudy");
        that.$el.find(".cloud").remove();
      }}, "-=0.3");
    App.navigate('works');
  }
});
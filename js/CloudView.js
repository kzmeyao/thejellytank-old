var CloudView = Backbone.View.extend({
  events: {
    "click .cloud-logo" : "goHome",
    "click .close" : "close"
  },

  initialize : function(options) {
    this.template = Handlebars.compile($("#cloud-template").html());
    this.photos = options.works.photos;
    this.ratio = 598/900;
  },

  render : function(type, id) {
    this.$el.addClass("cloudy");
    this.$el.append(this.template());
    var $jelly = $("#cloud-jelly"),
      tl = new TimelineLite();
    tl.to($jelly, 1, {scale : 2.5})
      .to($jelly, 1, {autoAlpha: 1});
    if (type == "photo") {
      var that = this;
      if (this.photos.length === 0) {
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
        this.startTheShowFrom(id);
      }
    } else {

    }
  },

  startTheShowFrom : function(id) {
    var that = this;
    var slides = [];
    var bodyW = $("body").width();
    var w = bodyW > 900 ? 900 : bodyW;
    var h = w * this.ratio;
    $.each(this.photos, function (index, photo) {
      slides.push({
        img: photo.image_url,
        width: w,
        height: h
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
      el.onload = function () { this.className = ''; }
      gallery.masterPages[i].appendChild(el);
    }

    gallery.onFlip(function () {
      var el,
        upcoming,
        i;

      for (i=0; i<3; i++) {
        upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

        if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
          el = gallery.masterPages[i].querySelector('img');
          el.className = 'loading';
          el.src = slides[upcoming].img;
          el.width = slides[upcoming].width;
          el.height = slides[upcoming].height;
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
  },

  goHome : function() {
    this.close();
    App.navigate("", {trigger : true});
  },

  close : function() {
    this.$el.removeClass("cloudy");
    this.$el.find(".cloud").remove();
  }
});
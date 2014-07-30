var CloudView = Backbone.View.extend({
  events: {
    "click .cloud-logo" : "goHome",
    "click .close" : "close"
  },

  initialize : function(options) {
    this.template = Handlebars.compile($("#cloud-template").html());
    this.photos = options.works.photos;
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
      if (!this.photos) {
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
    $.each(this.photos, function (index, photo) {
      slides.push("<img src='" + photo.image_url + "' />");
      if (photo.id == id) {
        that.index = index;
      }
    });
    var	gallery,
      el,
      i,
      page;

    gallery = new SwipeView('#wrapper', { numberOfPages: slides.length });
    for (i=0; i<3; i++) {
      page = i==0 ? slides.length-1 : i-1;
      el = document.createElement('span');
      el.innerHTML = slides[page];
      gallery.masterPages[i].appendChild(el);
    }
    gallery.onFlip(function () {
      var el,
        upcoming,
        i;

      for (i=0; i<3; i++) {
        upcoming = gallery.masterPages[i].dataset.upcomingPageIndex;

        if (upcoming != gallery.masterPages[i].dataset.pageIndex) {
          el = gallery.masterPages[i].querySelector('span');
          el.innerHTML = slides[upcoming];
          el.className = 'loading';
          el.width = slides[upcoming].width;
          el.height = slides[upcoming].height;

          el = gallery.masterPages[i].querySelector('span');
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
    console.log(this.index);
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
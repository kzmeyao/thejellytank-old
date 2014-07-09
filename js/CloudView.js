var CloudView = Backbone.View.extend({
  events: {
    "click .cloud-logo" : "goHome",
    "click .cloud-nav-works" : "goWork",
    "click .cloud-nav-hello" : "sayHello"
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
                // didn't want to use masonry
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
    $.each(this.photos, function (index, photo) {
      if (photo.id == id) {
        that.index = index;
      }
    });
    console.log(this.index);
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
var Works = Backbone.Collection.extend({
  model: Work,

  initialize: function() {
    _500px.init({
      sdk_key: 'a68318ac6a5a20260bbdbecdd3cf6976c051b84a'
    });

    this.writings = [
      {
        date : "06.28.2014",
        title : "Redesigning a Redesign of a Redesign",
        tags: "Essay, Random Thoughts"
      }
    ];
  },

  fetchWritings: function($el, template) {
    $el.append(template({works : this.writings}));
  },

  fetchPhotos: function($el, template) {
    var that = this;
    that.photos = [];
    _500px.api('/photos', {feature: "user", username : "kzmeyao", image_size : "4", sort : "taken_at"}, function (response) {
      if (response.success) {
        $.each(response.data.photos, function(index, photo) {
          photo.taken_at = photo.taken_at.substring(0,10).replace(/-/g, ".");
          if(photo.width > photo.height) {
            // didn't want to use masonry
            that.photos.push(photo);
          }
        });
        $el.append(template({works : that.photos}));
        if(Backbone.history.fragment == "hello") {
          TweenLite.to(window, 0.5, { scrollTo: { y: $(".hello-view").offset().top - 80} });
        }
      } else {
        console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
      }
    });
  }
});
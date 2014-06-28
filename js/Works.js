var Works = Backbone.Collection.extend({
  model: Work,

  initialize: function() {
    _500px.init({
      sdk_key: 'a68318ac6a5a20260bbdbecdd3cf6976c051b84a'
    });
  },

  fetch: function($el, template) {
    var that = this;
    _500px.api('/photos', {feature: "user", username : "kzmeyao", image_size : "3", sort : "taken_at"}, function (response) {
      if (response.success) {
        var photos = response.data.photos;
        $.each(photos, function(index, photo) {
          photo.created_at = photo.created_at.substring(0,10).replace(/-/g, ".");
          that.models.push(photo);
        });
        console.log(that.models);
        $el.append(template({works : that.models}));
        var $container = $el.find("ul");
        $container.imagesLoaded( function() {
          TweenLite.to($container, 0.7, {y : "-5"});
          TweenLite.to($container, 0.7, {autoAlpha : "1"});
          $container.masonry({
            isFitWidth: true
          });
        });
      } else {
        console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
      }
    });
  }
});
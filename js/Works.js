var Works = Backbone.Collection.extend({
  model: Work,

  initialize: function() {
    _500px.init({
      sdk_key: 'a68318ac6a5a20260bbdbecdd3cf6976c051b84a'
    });
  },

  fetch: function($el, template) {
    _500px.api('/photos', {feature: "user", username : "kzmeyao"}, function (response) {
      if (response.success) {
        console.log('There are ' + response.data.photos.length + ' photos.');
        $el.append(template());
      } else {
        console.log('Unable to complete request: ' + response.status + ' - ' + response.error_message);
      }
    });
  }
});
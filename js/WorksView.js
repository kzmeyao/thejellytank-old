var WorksView = Backbone.View.extend({
  events: {
    "click .photos img" : "renderPhotoCloud",
    "click .writings li" : "renderWritingCloud"
  },

  initialize : function() {
    this.writingsTemplate = Handlebars.compile($("#works-view-writings-template").html());
    this.photosTemplate = Handlebars.compile($("#works-view-photos-template").html());
    this.collection = new Works();
  },

  render : function() {
    this.collection.fetchWritings(this.$el, this.writingsTemplate);
    this.collection.fetchPhotos(this.$el, this.photosTemplate);
  },

  remove : function() {
    this.$el.empty();
  },

  renderPhotoCloud : function(e) {
    App.navigate('photo/' + $(e.currentTarget).data("id"), {'trigger' : true});
  },

  renderWritingCloud: function(e) {
    App.navigate('writing/' + $(e.currentTarget).data("id"), {'trigger' : true});
  },

  renderCloud: function(type, id) {
    if(!this.cloud) {
      this.cloud = new CloudView({el : "body", works : this.collection});
    }
    this.cloud.render(type, id);
  }
});
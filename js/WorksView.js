var WorksView = Backbone.View.extend({
  events: {

  },

  initialize : function() {
    this.writingsTemplate = Handlebars.compile($("#works-view-writings-template").html())
    this.photosTemplate = Handlebars.compile($("#works-view-photos-template").html());
    this.collection = new Works();
  },

  render : function() {
    this.collection.fetchWritings(this.$el, this.writingsTemplate);
    this.collection.fetchPhotos(this.$el, this.photosTemplate);
  },

  remove : function() {
    this.$el.empty();
  }
});
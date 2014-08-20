var Works = Backbone.Collection.extend({
  model: Work,

  initialize: function() {
    _500px.init({
      sdk_key: 'a68318ac6a5a20260bbdbecdd3cf6976c051b84a'
    });

    this.writings = [
      {
        id: 0,
        date : "06.28.2014",
        title : "Redesigning a Redesign of a Redesign",
        tags: "Essay, Random Thoughts",
        content: "The lysine contingency - it's intended to prevent the spread of the animals is case they ever got off the island. Dr. Wu inserted a gene that makes a single faulty enzyme in protein metabolism. The animals can't manufacture the amino acid lysine. Unless they're continually supplied with lysine by us, they'll slip into a coma and die. Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass. The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee."
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
var Works = Backbone.Collection.extend({
  model: Work,

  initialize: function() {
    _500px.init({
      sdk_key: 'a68318ac6a5a20260bbdbecdd3cf6976c051b84a'
    });

    this.writings = [
      {
        id: 0,
        date : "09.13.2014",
        title : "Redesigning a Redesign of a Redesign",
        tags: "Essay, Random Thoughts",
        content: "<p>I&apos;ve lost count &mdash; not of the number of sheep hopping over the fence at night while I twist and turn in my bed, but of the number of times I&apos;ve redesigned my website. How many times have I built it partially, completely, only to tear it down to a blank white page? It&apos;s frustrating playing the role of a designer, especially when you got a certain voice in your head.<br /><br />You see, during my creative process, I spend my time arguing. I argue with imaginary beings in my head, pushing and pulling back and forth on ideas and the various ways to implement them. Sometimes these people I argue with are projected figures of my friends. Sometimes they are the prototypical headhunters from the next hot startup. However, most of the time, I end up arguing with myself.<br /><br /><em>&quot;Is that all you can do? Certainly there&apos;s something better.&quot;</em><br /><br />That trendy big-shot in my head, let&apos;s call him &apos;Kevin 2.0&apos;, nags at me. It seems as if he knows what he is talking about. It seems as if he has data from scientifically-sound studies on what is good, what is bad, and what is so ridiculously terrible that I should deprive myself of sleep until I figure out a better way to do it. To make it worse, Kevin 2.0 incessantly feeds me stories of other people basking in glory, constantly reminding me of all the people who have made it. Sure, what he does is annoying, and from my description of him, I must&apos;ve made him out to be a goddamn awful prick. But to be fair, he doesn&apos;t mean any harm, at least not in the long term (gulp). While growing up with his constant sneers and jests, I learned how to deal with him. I initially saw him as a bully, but now I see him as a parent. Simply put, he is a parent who enjoys comparing his own kid to the other kids around him. He will tell you other people&apos;s accomplishments, not to make you feel bad about yourself, but to motivate you. At the end of the road, all he wishes for is your eventual 1st place finish, leaving all the other cool kids behind to bite the dust.<br /><br />Sure, there are different styles to parenting out there, but my gut feeling tells me Kevin 2.0 is right. He is right in the sense that his style of teaching fits with my style of learning, like two jigsaw pieces interlocking flawlessly to form the organism that is currently writing this strange piece comparing himself to a 2-piece jigsaw puzzle set. I should add the stale-smelling cardboard box and the bargain price sticker as well, but I digress.<br /><br />Kevin 2.0 and I will live on as one and learn from each other. He will be my life-long partner, forever feeding me new ideas and reminding me of how much I suck. I, too, will play the role of his partner, forever competing and intentionally losing to him to make him feel like the bigger person. <em>Symbiosis at work</em>. Together, we have some tremendous challenges ahead of us. With technology advancements setting the rapid cadence, we will inevitably be exposed to newer, shinier, arguably better things. It has actually gotten quite difficult to fathom the speed at which other people are creating now. Nonetheless, whatever they are up to, we will be right there beside them, tumbling and climbing over each others&apos; shoulders, continuously feeding back into a massive human pyramid. It was only yesterday when we were in the sea of people grasping for this pyramid&apos;s bottom ledge, but we have succeeded in taking that dreaded first step and are now on-route to summit humanity.<br/><br />In the eyes of the viewer, there was a version 1.0, and now there is a version 2.0. Little did they know that, along the way, there was a 1.1, 1.2, 1.3, 1.34, 1.39...<br /><br />This has been an insanely difficult first step.</p>"
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
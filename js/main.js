(function(){
  var App = new AppRouter;
  Backbone.history.start();

  var $jelly = $("#jelly"),
      tl = new TimelineLite();
  tl.to($jelly, 1, {scale : 2.5})
    .to($jelly, 1, {autoAlpha: 1});
})();


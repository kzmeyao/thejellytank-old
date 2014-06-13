(function(){
  var $jelly = $("#jelly"),
      tl = new TimelineLite();
  tl.to($jelly, 1, {scale : 3})
    .to($jelly, 1, {autoAlpha: 1});
})();

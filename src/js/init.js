// // initialize the application
window.onload = function(){
  console.log('init it');
  app.photos = app.PhotoStore();

  app.feed = app.photoFeed();

  app.feed.init();
};

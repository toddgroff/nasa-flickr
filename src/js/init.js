// // initialize the application
window.onload = function(){

  app.api = app.flickrApi();
  app.photos = app.PhotoStore();
  app.feed = app.photoFeed();
  app.selected = app.selectedPhoto();

  app.feed.init();
};

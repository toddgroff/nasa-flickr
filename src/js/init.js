// initialize the application
window.onload = function(){

  // add to the namepsace
  app.api = app.flickrApi();
  app.photos = app.PhotoStore();
  app.photo = app.Photo();
  app.feed = app.photoFeed();
  app.selected = app.selectedPhoto();

  // kickstart the feed
  app.feed.init();
};

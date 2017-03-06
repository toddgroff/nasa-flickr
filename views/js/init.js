// initialize the application
(function(){
  console.log('init it')
  app.photos = app.PhotoStore();

  app.photos.load();

  // app.photoFeed();
  //app.selectedPhoto();
})();

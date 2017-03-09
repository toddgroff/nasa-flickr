// // initialize the application
(function(){
  console.log('init it')
  app.photos = app.PhotoStore();

  app.feed = app.photoFeed();

  app.feed.init();
  // app.photoFeed();
  //app.selectedPhoto();
})();
// $(function(){
//   console.log('init it')
//   app.photos = app.PhotoStore();
//
//   app.feed = app.photoFeed();
//
//   app.feed.init();
//   // app.photoFeed();
//   //app.selectedPhoto();
// });

//
// $(function() {
//     app.appointments = app.AppointmentStore();
//
// // This is the default view, which is set up and initialized
// // in show-list-view.js
//     app.appointments.load();
//
//     app.showListView();
// });

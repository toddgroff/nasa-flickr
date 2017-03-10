app.PhotoStore = function() {
  var photos = [],
      self = {
        add: function (newPhotosPromise) {
          newPhotosPromise.then(function(resp){
            photos.push.apply(photos, resp.data.photos.photo);
            console.log('photos are', photos);
            console.log(self.query());
          }).catch(function(err){
            console.log('Error:', err);
          });
        },
        query: function() {
          console.log('in query');
          return photos;
        },
        load: function(num) {
          var pageNum = num || 1,
              loadedPhotosPromise = app.api.getPhotos(pageNum);
          if (pageNum > 1) console.log('my pageNum is %s', pageNum);
          self.add(loadedPhotosPromise);
          return loadedPhotosPromise;
        },
        find: function(id) {
          // for (var i = 0; i < photos.length; ++i) {
          //   if (photos[i].id === id) return photos[i];
          // }
          for (var photo in photos) {
            if (photo.id === id) return photo;
          }
        },
      };
  return self;
};

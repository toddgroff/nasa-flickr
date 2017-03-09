app.PhotoStore = function() {
  var photos = [],
      self = {
        add: function (newPhotos) {
            photos.push.apply(photos, newPhotos);
        },
        query: function() {
          return photos;
        },
        load: function(num) {
          var pageNum = num || 1,
              api = app.flickrApi(),
              loadedPhotos = api.getPhotos(pageNum);
          console.log('my pageNum is %s', pageNum)
          self.add(loadedPhotos);
          return loadedPhotos;
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

//
// function setupSpoonflowerApi() {
//   var baseUrl = 'http://api.v1.spoonflower.com/design/';
//
//   function fetchUrl(url) {
//     var promise = $.Deferred();
//     // this has to change for JSONP
//     var req = $.ajax({
//       //url property with this value
//       url: url,
//       dataType: "jsonp",
//       timeout: 5000, // fake .fail() a lot of time for the request to be successfully completed
//       success: function(data) {
//         promise.resolve(data);
//       },
//       error: function(data) {
//         promise.reject(req, 'Unknown error', data);
//       }
//     });
//     return promise;
//   }
//
//   var self = {
//     getPopularList: function() {
//
//     }
//
//   return self;


// //The appointment store object is responsible for persisiting and loading appointments, adding, removing and returning
// app.AppointmentStore = function () {
//     var appts = [];
//     var self = {
//         add: function (appt) {
//             appts.push(appt);
//             self.save();
//         },
//
//         query: function () {
//             return appts;
//         },
//
//         getById: function (appointmentId) {
//             for (var i = 0; i < appts.length; ++i) {
//                 if (appts[i].id === appointmentId) {
//                     return appts[i];
//                 }
//             }
//         },

//         load: function () {
//             appts = JSON.parse(localStorage.getItem('appts') || '[]').map(app.Appointment);
//         },
//
//         save: function () {
//             localStorage.setItem('appts', JSON.stringify(appts));
//         }
//     };
//
//     return self;
// };

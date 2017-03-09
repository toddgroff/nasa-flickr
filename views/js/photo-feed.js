app.photoFeed = function(){
  var photoFeedList = document.getElementById('photo-feed-list'),
      self = {
        addItems: function(newPhotos){
          return newPhotos.map(function(photo) {
        });
      },
      renderItems: function(photos){
        photos.map(function(photo) {
          var item = self.item(photo);
          photoFeedList.appendChild(item);
        });
      },
      renderItem: function(photo){
        var item = document.createElement('li'),
            img = document.createElement('img');
        img.src = photo.url;
        img.className = 'feed-item-img';
        item.appendChild(img);
        item.className = 'feed-item';
        return item;
      },
      init: function(){
        self.renderItems(app.photos.load());
      }
    };
  return self;
};

// function showPopularResults() {
//       Api.getPopularList().done(function(response) {
//         var results = response.results[0].results;
//         var resultElements = apiResultToElements(results);
//
//         $('.fabric-modal-list').empty().append(resultElements);
//       })
//     }

    // function apiResultToElements(results) {
    //
    //       return results.map(function(item) {
    //         return addPaletteToPreview(item);
    //       });
    //     }

// var appts = app.appointments.query().sort(function(a, b) {
//             if (a.dateTime() < b.dateTime()) {
//                 return -1;
//             }
//             return 1;
//         });
//
//
//

// function apiResultToElements(results) {
//
//       return results.map(function(item) {
//         return addPaletteToPreview(item);
//       });
//     }


// ////////////////////////////////////////////////////////////////////////////////
//     //CREATES FABRIC SWATCH PALETTE
//
//     function drawPalette(location, palette) {
//       $(location).html(palette.map(function(fabric) {
//         var li = $('<li class="fabric-preview card"><button alt="Remove from palette" class="remove-fabric-btn icon-button"><i class="fa fa-minus-circle inner-button-icon"></i></button><div class="fabric-img-container"><img src="' + fabric.thumbnail_url + '"></div></li>');
//         //.data(key, value) key= string 'fabric', value is fabric object
//         // .data makes the thing a part of the DOM
//         li.data('fabric', fabric);
//         return li;
//       }));
//       checkDuplicateSwatches(designItem);
//     }
//
//     //////////////////////////////////////////////////////////////////////////////
//   //CREATES FABRIC SWATCH PALETTE
//
//   function drawPalette(location, palette) {
//     $(location).html(palette.map(function(fabric) {
//       var li = $('<li class="fabric-preview card">' +
//         '<button alt="Remove from palette" class="remove-fabric-btn icon-button">' +
//         '<i class="fa fa-minus-circle inner-button-icon"></i>' +
//         '</button>' +
//         '<div class="fabric-img-container">' +
//         '<img>' +
//         '</div>' +
//         '</li>');
//       li.find('img')
//         .attr('src', fabric.thumbnail_url)
//         .attr('data-id', fabric.id)
//
//       //.data(key, value) key= string 'fabric', value is fabric object
//       // .data makes the thing a part of the DOM
//       li.data('fabric', fabric);
//       return li;
//     }));
//
//   }

app.photoFeed = function(){
  var photoFeedList = document.getElementById('photo-feed-list'),
      self = {
      renderItems: function(photos, replace){
        var replacePhotos = replace || false,
            items = [];
        photos.map(function(photo) {
          var item = self.buildItem(photo);
          items.push(item);
        });
        replacePhotos
        ? photoFeedList.innerHTML = items
        : photoFeedList.innerHTML += items
        // photoFeedList.appendChild(item);
      },
      buildItem: function(photo){
        var item = document.createElement('li'),
            img = new Image();
            overlay = document.createElement('span'),
            anchor = document.createElement('a');
        anchor.href = '#selected-photo';
        anchor.id = photo.id;
        // anchor.className = 'img-not-loaded';
        overlay.className = 'feed-item-overlay';
        anchor.appendChild(overlay);

        img.src = photo.url_l;
        img.onload = function(){
          // var newClass = anchor.className.replace(/img-not-loaded/i, 'img-loaded');
          // anchor.className = newClass;
          item.style.backgroundImage = 'url('+img.src+')';
        }
        item.appendChild(anchor);
        item.title = photo.title;
        item.className = 'feed-item';
        return item;
      },
      sort: function(dir){
        var sortedPhotos = app.photos.query().sort(fucntion(a,b){
          if (dir < 0) {
            if ((dir < 0 && a.datetaken < b.datetaken)|| (dir > 0 && a.datetaken < b.datetaken)) {
              return -1;
            } else {
              return 1;
            }
          }
        });
        self.renderItems(sortedPhotos,true);
      },
      init: function(){
        var initialPhotos = app.photos.load();
        initialPhotos.then(function(resp){
          self.renderItems(resp.data.photos.photo);
        }).catch(function(err){
          console.log('Error:', err);
        });
        photoFeedList.addEventListener('click', function(e){
          // if (e.target.parentElement.nodeName.toLowerCase() === 'a') app.selectedPhoto.select(e.target.id);
        });
        document.getElementById('load-more-photos').addEventListener('click', function(){
          app.photos.load().then(function(resp){
            var newPhotos = resp.data.photos.photo;
            self.renderItems(newPhotos);
            document.getElementById(newPhotos[0].id).focus();
          }).catch(function(err){
            console.log('Error:', err);
          });
        });
        document.getElementById('sort-by-date').addEventListener('click' function(e){
          var sortDir = e.target.getAttribute('data-sort-dir');
              oppSortDir = ParseInt(sortDir) * -1;
          self.sort(sortDir);
          e.target.setAttribute('data-sort-dir', oppSortDir);
        })
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
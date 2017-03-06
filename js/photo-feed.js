app.photoFeed = function() {
  var self = {
    addItems: function(newPhotos){
      return newPhotos.map(function(photo) {

      });
    },
    renderItems: function(photos){
      var photos = photos.map(function(photo) {
            return self.item(photo);
          }),
      document.getElementById('photo-feed-list').appendChild


    },
    item: function(photo){
      var item = document.createElement('li'),
          img = document.createElement('img');
      img.src = photo.url;
      img.className = 'feed-item-img';
      item.appendChild(img);
      item.className = 'feed-item';
      return item;
    };
  };
};


var appts = app.appointments.query().sort(function(a, b) {
            if (a.dateTime() < b.dateTime()) {
                return -1;
            }
            return 1;
        });




// function apiResultToElements(results) {
//
//       return results.map(function(item) {
//         return addPaletteToPreview(item);
//       });
//     }


////////////////////////////////////////////////////////////////////////////////
    //CREATES FABRIC SWATCH PALETTE

    function drawPalette(location, palette) {
      $(location).html(palette.map(function(fabric) {
        var li = $('<li class="fabric-preview card"><button alt="Remove from palette" class="remove-fabric-btn icon-button"><i class="fa fa-minus-circle inner-button-icon"></i></button><div class="fabric-img-container"><img src="' + fabric.thumbnail_url + '"></div></li>');
        //.data(key, value) key= string 'fabric', value is fabric object
        // .data makes the thing a part of the DOM
        li.data('fabric', fabric);
        return li;
      }));
      checkDuplicateSwatches(designItem);
    }

    //////////////////////////////////////////////////////////////////////////////
  //CREATES FABRIC SWATCH PALETTE

  function drawPalette(location, palette) {
    $(location).html(palette.map(function(fabric) {
      var li = $('<li class="fabric-preview card">' +
        '<button alt="Remove from palette" class="remove-fabric-btn icon-button">' +
        '<i class="fa fa-minus-circle inner-button-icon"></i>' +
        '</button>' +
        '<div class="fabric-img-container">' +
        '<img>' +
        '</div>' +
        '</li>');
      li.find('img')
        .attr('src', fabric.thumbnail_url)
        .attr('data-id', fabric.id)

      //.data(key, value) key= string 'fabric', value is fabric object
      // .data makes the thing a part of the DOM
      li.data('fabric', fabric);
      return li;
    }));

  }

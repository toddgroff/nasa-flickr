app.photoFeed = function(){
  var photoFeedList = document.getElementById('photo-feed-list'),
      self = {
      renderItems: function(photos, replace){
        var replacePhotos = replace || false,
            items = [];

        if (replacePhotos) {
          while (photoFeedList.firstChild) {
              photoFeedList.removeChild(photoFeedList.firstChild);
          }
        }
        photos.map(function(photo) {
          var item = self.buildItem(photo);
          photoFeedList.appendChild(item);
        });
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
      sortFeed: function(){
        document.getElementById('sort-by-date').addEventListener('click', function(e){
          var sortDir = parseInt(e.target.getAttribute('data-sort-dir'));
              oppSortDir = sortDir* -1,
              cb = function(){
                self.renderItems(app.photos.currentPhotos, true);
                document.getElementById(app.photos.currentPhotos[0].id).focus();
                e.target.setAttribute('data-sort-dir', oppSortDir);
              };
          app.photos.sort(sortDir, cb);
        });
      },
      loadMoreToFeed: function(){
        document.getElementById('load-more-photos').addEventListener('click', function(){
          app.photos.load().then(function(resp){
            var newPhotos = resp.data.photos.photo;
            self.renderItems(newPhotos);
            document.getElementById(newPhotos[0].id).focus();
          }).catch(function(err){
            console.log('Error:', err);
          });
        });
      },
      setSelectPhoto: function(){
        photoFeedList.addEventListener('click', function(e){
          var parent = e.target.parentElement;
          console.log('id from target', anchor.nodeName.toLowerCase() === 'a');
          if (parent.nodeName.toLowerCase() === 'a') app.photos.currentSelected = parent.id;
        });
      },
      init: function(){
        var initialPhotos = app.photos.load();
        initialPhotos.then(function(resp){
          self.renderItems(resp.data.photos.photo);
        }).catch(function(err){
          console.log('Error:', err);
        });
        self.sortFeed();
        self.loadMoreToFeed();
        self.setSelectPhoto();
        app.selected.setclose();
      }
    };
  return self;
};

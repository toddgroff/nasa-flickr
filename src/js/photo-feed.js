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
          // var newClass = anchor.className.replace(/img-not-loaded/g, 'img-loaded');
          // anchor.className = newClass;
          item.style.backgroundImage = 'url('+img.src+')';
        }
        item.appendChild(anchor);
        item.title = photo.title;
        item.className = 'feed-item';
        return item;
      },
      sortFeed: function(e){
        var sortDir = parseInt(e.target.getAttribute('data-sort-dir')),
            oppSortDir = sortDir* -1,
            sortProp = e.target.getAttribute('data-sort-prop');
            cb = function(){
              self.renderItems(app.photos.currentPhotos, true);
              document.getElementById(app.photos.currentPhotos[0].id).focus();
              e.target.setAttribute('data-sort-dir', oppSortDir);
            };
        app.photos.sort(sortDir, sortProp, cb);
      },
      setSortFeed: function(){
        document.getElementById('sort-by-date').addEventListener('click', function(e){
          self.sortFeed(e);
        }, false);
        document.getElementById('sort-by-faves').addEventListener('click', function(e){
          self.sortFeed(e);
        }, false);
      },
      // setFilterFeed: function(){
      //   document.getElementById('filter-by-tags').addEventListener('click', function(e){
      //     var tagsOnly = e.target.getAttribute('data-tags-only');
      //     app.photos.filter(tagsOnly);
      //   });
      // },
      // filterFeed: function(){
      //   var filterButton = document.getElementById('filter-by-tags'),
      //       hiddenPhotos = app.photos.hiddenPhotos;
      //
      //   if (hiddenPhotos.length > 0) {
      //     for ( var i = 0; i < hiddenPhotos.length; ++i) {
      //       document.getElementById(hiddenPhotos[i].id).parentElement.className += ' hidden';
      //     }
      //     filterButton.setAttribute('data-tags-only', false);
      //     filterButton.innerText = 'show all photos';
      //   } else {
      //     var hiddenItems = document.querySelectorAll('.hidden');
      //     for (var i = 0; i < hiddenItems.length; ++i) {
      //       var newClasses = hiddenItems[i].className.replace(/hidden/g, '');
      //       hiddenItems[i].className = newClasses;
      //     }
      //     filterButton.setAttribute('data-tags-only', true);
      //     filterButton.innerText = 'show tagged photos';
      //   }
      // },
      loadMoreToFeed: function(){
        window.addEventListener('scroll', function(ev) {
          if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            var loadingMessage = document.getElementById('loading-photos-message');
            loadingMessage.className += ' active';
            app.photos.load().then(function(resp){
              var newPhotos = resp.data.photos.photo;
              self.renderItems(newPhotos);
              document.getElementById(newPhotos[0].id).focus();
              setTimeout(function(){
                loadingMessage.className = loadingMessage.className.replace(/active/g, '');
              }, 1000);
            }).catch(function(err){
              console.log('Error:', err);
            });
          }
        });
      },
      setSelectPhoto: function(){
        var evtParent = function(e){
              return e.target.parentElement;
            },
            isAnchor = function(elem){
              return (elem.nodeName.toLowerCase() === 'a');
            },
            set = function(e, parent){
              var useParent = parent || false;
              e.preventDefault();
              app.photos.currentSelected = useParent ? evtParent(e).id : e.target.id;
            };
        photoFeedList.addEventListener('click', function(e){
          if (isAnchor(evtParent(e))) set(e, true);
        });
        photoFeedList.addEventListener('keydown', function(e){
          if (isAnchor(e.target) && e.keyCode === 13) set(e);
        });
      },
      init: function(){
        var initialPhotos = app.photos.load();
        initialPhotos.then(function(resp){
          self.renderItems(resp.data.photos.photo);
        }).catch(function(err){
          console.log('Error:', err);
        });
        self.setSortFeed();
        // self.setFilterFeed();
        self.loadMoreToFeed();
        self.setSelectPhoto();
        app.selected.setClose();
      }
    };
  return self;
};

app.selectedPhoto = function(){
  var selectedPhotoContainer = document.getElementById('selected-photo-container'),
      selectedPhotoTitle = document.getElementById('selected-photo-title'),
      selectedPhotoDesc = document.getElementById('selected-photo-description'),
      selectedPhotoClose = document.getElementById('selected-photo-close'),
      selectedPhotoCopy = document.getElementById('selected-photo-copy'),
      selectedPhotoImg = document.createElement('img'),
      self = {
        render: function(photo){
          if (photo === null) {
            // render is called by photos.selected setter callback which passes null when deselecting
            self.close();
          } else {
            var img = new Image();
            selectedPhotoImg.src = photo.url_l;
            selectedPhotoImg.className = 'selected-photo-img';
            selectedPhotoImg.alt = photo.title;
            selectedPhotoImg.onload = function(){
              selectedPhotoContainer.style.backgroundImage = 'url('+photo.url_l+')';
              selectedPhotoCopy.appendChild(selectedPhotoImg);
            };
            img.src = photo.url_o;
            img.onload = function(){
              selectedPhotoContainer.style.backgroundImage = 'url('+photo.url_o+')';
              // e.target.parentElement.className += ' img-loaded';
            };
            selectedPhotoContainer.className += ' active'
            selectedPhotoTitle.innerHTML = photo.title;
            selectedPhotoDesc.innerHTML = photo.description._content;
            // Focus on close button for keyboard use
            selectedPhotoClose.focus();
            selectedFeedItem.tabIndex = 1;
            // TODO: switch the assignment below for the call to getBestSize to get the best available image
            // selectedPhotoImg = app.photo.getBestSize();
          }
        },
        setFocus: function(photo){
          var selectedId = photo.id,
              selectedFeedItem = document.getElementById(selectedId);
          selectedFeedItem.focus();
        },
        setClose: function(){
          document.addEventListener('keydown', function(e){
            if (e.keyCode == 27) {
              // Refocus on the current selected feed item so user can continue scrolling with keyboard
              self.setFocus(app.photos.currentSelected);
              // then deselect photo
              app.photos.currentSelected = null;
            }
          }, false);
          selectedPhotoClose.addEventListener('click',function(){
            // Refocus on the current selected feed item so user can continue scrolling with keyboard
            self.setFocus(app.photos.currentSelected);
            // then deselect photo
            app.photos.currentSelected = null;
          }, false);
        },
        close: function(){
          var newClass = selectedPhotoContainer.className.replace(/img-loaded/g, '').replace(/active/g, '');
          selectedPhotoContainer.className = newClass;
        }
  };
  return self;
};

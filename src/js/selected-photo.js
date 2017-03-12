app.selectedPhoto = function(){
  var selectedPhotoContainer = document.getElementById('selected-photo-container'),
      selectedPhotoTitle = document.getElementById('selected-photo-title'),
      selectedPhotoUpload = document.getElementById('selected-upload-date'),
      selectedPhotoTags = document.getElementById('selected-photo-tags'),
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
            selectedPhotoUpload.innerHTML = new Date(photo.dateupload * 1000).toString().split(" ").slice(0, 4).join(" ");
            selectedPhotoTags.innerHTML = '';
            if (photo.tags.length > 0) {
              var tags = photo.tags.split(' ');
              for (var i = 0; i < tags.length; ++i) {
                var tagEl = document.createElement('span');
                tagEl.innerText = tags[i];
                tagEl.className = 'photo-tag';
                selectedPhotoTags.appendChild(tagEl);
              }
            }
            selectedPhotoDesc.innerHTML = photo.description._content;
            // Focus on close button for keyboard use
            selectedPhotoClose.focus();
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

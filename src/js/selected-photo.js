app.selectedPhoto = function(){
  var selectedPhotoContainer = document.getElementById('selected-photo-container'),
      selectedPhotoTitle = document.getElementById('selected-photo-title'),
      selectedPhotoDesc = document.getElementById('selected-photo-description'),
      selectedPhotoImg = document.getElementById('selected-photo-img'),
      selectedPhotoClose = document.getElementById('selected-photo-close');
      self = {
        render: function(photo){
          if (photo === null) {
            self.close();
          } else {
            selectedPhotoTitle.innerText = photo.title;
            selectedPhotoDesc.innerText = photo.description._content;
            // TODO: switch the assignment below for the call to getBestSize to get the best available image
            // selectedPhotoImg = app.photo.getBestSize();
            // selectedPhotoImg.src = photo.url_l;
            selectedPhotoContainer.className += ' active'
            selectedPhotoImg.onload = function(e){
              selectedPhotoContainer.style.backgroundImage = photo.url_l;
              e.target.parentElement.className += ' img-loaded';
            };
          }
        },
        setClose: function(){
          selectedPhotoClose.addEventListener('click',function(){
            app.photos.currentSelected = null;
          });
        },
        close: function(){
          selectedPhotoContainer.className.replace(/active/i, '');
        }
  };
  return self;
};

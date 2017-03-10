app.selectedPhoto = function(){
  var selectedPhotoContainer = document.getElementById('selected-photo-container'),
      selectedPhotoTitle = document.getElementById('selected-photo-title'),
      selectedPhotoDesc = document.getElementById('selected-photo-description'),
      selectedPhotoImg = document.getElementById('selectedPhotoImg'),
      self = {
        renderSelectedPhoto: function(id){
          var photo = app.photos.find(id);
          selectedPhotoTitle.innerText = photo.title;
          selectedPhotoDesc = photo.description.content;
          selectedPhotoImg = photo.image
        }
  };
  return self;
};

app.Photo = function(){
  var self = {
    getBestSize: function(id){
      app.api.getPhotoSizes(id).then(function(resp){
        var sizes = resp.sizes.sizes;
        // sizes()
      }).catch(function(err){
        // TODO: implement error messages
        console.log('Error:', err);
      });
    }
  };
  return self;
};

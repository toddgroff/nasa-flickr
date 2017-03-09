app.flickrApi = function(){
  var self = {
    // getPhotos: function(pageNum) {
    //   console.log('getting photos');
    //   var xhr = new XMLHttpRequest(),
    //       url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&extras=date_taken,description,url_l,url_o,geo,tags,faves&per_page=50&page=' + pageNum;
    //   xhr.open('GET', url);
    //   xhr.send(null);
    //
    //   xhr.onreadystatechange = function () {
    //     var done = 4,
    //         ok = 200;
    //     if (xhr.readyState === done) {
    //       if (xhr.status === ok) {
    //         console.log(xhr.responseText);
    //         return xhr.responseText.photos.photo;
    //       } else {
    //         console.log('Error: ' + xhr.status);
    //         console.log('Error: ' + xhr.responseText);
    //         return xhr.responseText;
    //       }
    //     }
    //   };
    // }
    getPhotos: function(pageNum) {
      var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&extras=date_taken,description,url_l,url_o,geo,tags,faves&per_page=50&page=' + pageNum;
      return axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'apllication/json'
        },
        validateStatus: function(status){
          return status === 200
        }
      });
      // .then(function(resp){
      //   return resp.data
      // }).catch(function(err){
      //
      // });
    }
  };
  return self;
};

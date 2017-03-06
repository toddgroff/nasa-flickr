var axios = require('')

app.flickrApi = function(){
  var
  var self = {
    getPhotos: function(pageNum) {
      console.log('getting photos')
      var xhr = new XMLHttpRequest(),
          url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&extras=date_taken,description,url_l,url_o,geo,tags,faves&per_page=50&page=' + pageNUM;
      xhr.open('GET', url);
      xhr.send(null);

      xhr.onreadystatechange = function () {
        var done = 4,
            ok = 200;
        if (xhr.readyState === done) {
          if (xhr.status === ok) {
            console.log('xhr data', xhr.data);
            console.log(xhr.responseText);
          } else {
            console.log('Error: ' + xhr.status);
          }
        }
      };
    };
  };
  return self;
};

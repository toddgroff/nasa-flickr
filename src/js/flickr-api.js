app.flickrApi = function(){
  var baseUrl = 'https://api.flickr.com/services/rest/?method=flickr',
      auth = '&api_key=a5e95177da353f58113fd60296e1d250',
      format = '&format=json&nojsoncallback=1',
      self = {
    getPhotos: function(pageNum) {
      var endpoint = '.people.getPublicPhotos',
          params = '&user_id=24662369@N07',
          perPage = 36,
          extras = '&extras=date_upload,description,url_l,url_o&per_page='+perPage+'&page='+pageNum,
          url = baseUrl+endpoint+auth+params+format+extras;
      return self.sendRequestPromise(url);
    },
    getPhotoSizes: function(id){
      var endpoint = '.photos.getSizes',
          params = '&photo_id='+id,
          url = baseUrl+endpoint+auth+params+format;
      return self.sendRequestPromise(url);
    },
    sendRequestPromise: function(url){
      return axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'apllication/json'
        },
        validateStatus: function(status){
          return status === 200
        }
      });
    }
  };
  return self;
};

// Example request urls:
// https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&extras=date_upload,description,url_l,url_o&per_page=32&page=1
// https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=a5e95177da353f58113fd60296e1d250&format=json&nojsoncallback=1&photo_id=30651540721

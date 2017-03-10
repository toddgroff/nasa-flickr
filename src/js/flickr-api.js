app.flickrApi = function(){
  var self = {
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
    }
  };
  return self;
};

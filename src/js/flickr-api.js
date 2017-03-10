app.flickrApi = function(){
  var self = {
    getPhotos: function(pageNum) {
      var url = 'https://api.flickr.com/services/rest/?method=flickr.people'+'\n'
                +'.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250'+'\n'
                +'&user_id=24662369@N07&format=json&nojsoncallback=1'+'\n'
                +'&extras=date_upload,description,url_l,url_o&per_page=32&page='+'\n'
                +pageNum;
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

// https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=a5e95177da353f58113fd60296e1d250&user_id=24662369@N07&format=json&nojsoncallback=1&extras=date_upload,description,url_l,url_o&per_page=32&page=1

app.PhotoStore = function() {
  var self = {
        _photos: [],
        get currentPhotos(){
          return this._photos;
        },
        set currentPhotos(newPhotos){
          this._photos = newPhotos;
          // console.log('There are now %s photos', this._photos.length);
          // console.log('The first photo is now %s', this._photos[0].title);
        },
        _selected: null,
        get currentSelected(){
          return this._selected;
        },
        set currentSelected(id){
          this._selected = id === null ? null : this.find(id);
          // if (this.currentSelected !== null) console.log('Photo #%s is now selected', this._selected);
          app.selected.render(this._selected);
        },
        _pageNum: 0,
        get currentPageNum() {
          return this._pageNum;
        },
        set currentPageNum(num) {
          this._pageNum = num;
          // console.log('the current page is now %s', self.currentPageNum);
        },
        add: function (newPhotosPromise) {
          newPhotosPromise.then(function(resp){
            var newPhotos = self.currentPhotos.concat(resp.data.photos.photo);
            self.currentPhotos = newPhotos;
          }).catch(function(err){
            console.log('Error:', err);
          });
        },
        sort: function(dir, cb){
          var sortedPhotos = this.currentPhotos.sort(function(a,b){
            if ((dir > 0 && a.dateupload < b.dateupload) || (dir < 0 && a.dateupload > b.dateupload)) {
              return -1;
            } else {
              return 1;
            }
          });
          var newDates = []
          for (var sPh in sortedPhotos) {
            newDates.push(sPh.dateupload);
          }
          self.currentPhotos = sortedPhotos;
          if (typeof cb !== "undefined") {
            cb();
          }
        },
        load: function() {
          self.currentPageNum += 1
          console.count();
          var loadedPhotosPromise = app.api.getPhotos(self.currentPageNum);
          self.add(loadedPhotosPromise);
          return loadedPhotosPromise;
        },
        find: function(id) {
          var photos = this.currentPhotos;
          for (var i = 0; i < photos.length; ++i) {
            if (photos[i].id === id) {
              return photos[i];
            } else if (i === photos.length - 1) {
              return null;
            }
          }
        },
      };
  return self;
};

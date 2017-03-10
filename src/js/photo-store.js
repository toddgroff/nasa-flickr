app.PhotoStore = function() {
  var pageNum = 0,
      self = {
        _photos: [],
        get currentPhotos(){
          return this._photos;
        },
        set currentPhotos(newPhotos){
          this._photos = newPhotos;
          console.log('There are now %s photos', this._photos.length);
          console.log('The first photo is now %s', this._photos[0].title);
        },
        _selected: null,
        get currentSelected(){
          return this._selected;
        },
        set currentSelected(id){
          console.log('id coming in as ', id)
          this._selected = id === null ? null : this.find(id);
          console.log('selected', this.find(id));
          this.currentSelected !== null && console.log('Photo #%s is now selected', this._selected);
          app.selected.render(this._selected);
        },
        get currentPageNum() {
          return pageNum;
        },
        set currentPageNum(num) {
          pageNum = num;
          console.log('the current page is now %s', self.currentPageNum);
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
          if (self.currentPageNum > 1) console.log('my pageNum is %s', self.currentPageNum);
          self.add(loadedPhotosPromise);
          return loadedPhotosPromise;
        },
        find: function(id) {
          for (var i = 0; i < this.currentPhotos.length; ++i) {
            if (this.currentPhotos[i].id === id) return this.currentPhotos[i];
          }
          // for (var photo in this.currentPhotos) {
          //   if (photo.id === id) return photo;
          // }
          // return null;
        },
      };
  return self;
};

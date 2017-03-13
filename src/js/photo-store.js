app.PhotoStore = function() {
  var self = {
        _photos: [],
        get currentPhotos(){
          return this._photos;
        },
        set currentPhotos(photos){
          this._photos = photos;
          // console.log('There are now %s photos', this._photos.length);
          // console.log('The first photo is now %s', this._photos[0].title);
        },
        // the hidden behavior was acting kinda weird
        // _hidden: [],
        // get hiddenPhotos(){
        //   return this._hidden;
        // },
        // set hiddenPhotos(photos){
        //   this._hidden = photos;
        //   app.feed.filterFeed();
        // },
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
        sort: function(dir, prop, cb){
          var sortedPhotos = this.currentPhotos.sort(function(a,b){
            if ((dir > 0 && parseInt(a[prop]) < parseInt(b[prop])) || (dir < 0 && parseInt(a[prop]) > parseInt(b[prop]))) {
              return -1;
            } else {
              return 1;
            }
          });
          self.currentPhotos = sortedPhotos;
          // for focusing on first photo after sort
          if (typeof cb !== "undefined") {
            cb();
          }
        },
        // This had some weird behavior with infinite scroll and with revealing all, maybe later
        // filter: function(tagsOnly){
        //   var noTags = function(photo){
        //         return photo.tags.length < 1;
        //       },
        //       filteredOutPhotos = this.currentPhotos.filter(noTags);
        //   // if tags only param passed filter, otherwise, set all photos to visible
        //   this.hiddenPhotos = tagsOnly ? filteredOutPhotos : [];
        // },
        load: function() {
          self.currentPageNum += 1
          // console.count();
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

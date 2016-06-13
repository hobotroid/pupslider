var giSearch = require('google-image-search');

export default class GoogleImage {

    constructor() {

    }

    get(searchTerm, numImages) {
        console.log('getting ' + searchTerm);
        giSearch(searchTerm);



    }

    /*
    var fetchJSON = function(url) {
      return new Promise((resolve, reject) => {
        $.getJSON(url)
          .done((json) => resolve(json))
          .fail((xhr, status, err) => reject(status + err.message));
      });
  }*/
}

News = {
  find: function(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      callback(JSON.parse(xhr.responseText).news);
    };

    xhr.open('get', 'https://goldfinchjewellery.herokuapp.com/news.json', true);
    xhr.send();
  }
};

Gallery = {
  find: function(gallery, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      callback(filter(function(jewelleryItem) {
        return jewelleryItem.gallery.toLowerCase().replace(' ', '-') === gallery;
      }, JSON.parse(xhr.responseText).jewellery));
    };

    xhr.open('get', 'https://goldfinchjewellery.herokuapp.com/jewellery.json', true);
    xhr.send();
  }
};

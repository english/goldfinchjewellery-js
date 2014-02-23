News = {
  find: function(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      callback(JSON.parse(xhr.responseText).newsItems);
    };

    xhr.open('get', 'http://goldfinchjewellery.herokuapp.com/news.json', true);
    // xhr.open('get', 'http://localhost:3001/news.json', true);
    xhr.send();
  }
};

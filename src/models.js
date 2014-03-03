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

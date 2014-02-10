function simpleView(path) {
  var templateId = path + '-template';
  var template = document.getElementById(templateId).cloneNode(true);

  removeClass([template], 'hidden');

  window.ROOT_ELEMENT.appendChild(template);
}

function newsView() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;

    var json = JSON.parse(xhr.responseText);

    window.ROOT_ELEMENT.innerHTML = renderNewsItems(json.newsItems);
  };

  xhr.open('get', 'http://goldfinchjewellery.herokuapp.com/news.json', true);
  xhr.send();
}

function renderNewsItems(newsItems) {
  var groupedNewsItems = groupBy('category', newsItems);
  var categories = Object.keys(groupedNewsItems);
  var template = '';

  template += '<div class="latest-news">';
  template += '<ul class="news-items">';
  template += map(function(category) {
    return renderCategory(category, groupedNewsItems[category]);
  }, categories).join('');
  template += '</ul>';
  template += '</div>';

  return template;
}

function renderCategory(name, newsItems) {
  var template = '';
  var className = name.toLowerCase().replace(/\s+/g, '-');

  template += '<li class="news-category ' + className + '" id="news-' + className + '">';
  template += '<h2 class="category-name">' + name + '</h2>';
  template += map(renderNewsItem, newsItems).join('');
  template += '</li>';

  return template;
}

function renderNewsItem(newsItem) {
  var template = '';
  var body = markdown(newsItem.body);

  template += '<article class="news-item">';
  template += '<div class="content">' + body + '</article>';
  template += '</article>';

  return template;
}

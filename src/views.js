function applicationView(path) {
  var leadingPath = first(path.split('/'));

  setTitle();
  setTitleImage();
  setCurrentMenuItem();

  function setTitle() {
    var prefix = menuLink().innerText;
    var suffix = 'Lucy Ramsbottom, Jewellery Designer Maker';

    document.title = [prefix, suffix].join(' - ');
  }

  function setTitleImage() {
    var imageUrl = 'https://s3-eu-west-1.amazonaws.com/goldfinchjewellery/' + leadingPath + '.jpg';

    document.getElementById('title-image').src = imageUrl;
  }

  function setCurrentMenuItem() {
    removeClass(document.querySelectorAll('#menu .current'), 'current');

    var menuItem = menuLink().parentNode;
    menuItem.className += ' current';
  }

  function menuLink() {
    var menuLinks = document.querySelectorAll('#menu a');

    return find(function(link) {
      return link.getAttribute('href').replace('#', '') === leadingPath;
    }, menuLinks);
  }
}

function simpleView(path) {
  var element = document.getElementById('main');

  return function() {
    var templateId = path + '-template';
    var template = document.getElementById(templateId).cloneNode(true);

    removeClass([template], 'hidden');

    element.innerHTML = '';
    element.appendChild(template);
  }
}

function newsView() {
  var element = document.getElementById('main');

  News.find(function(newsItems) {
    element.innerHTML = renderNewsItems(newsItems);
  });
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
  var className = name.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');

  template += '<li class="news-category ' + className + '" id="news-' + className + '">';
  template += '<h2 class="category-name">' + name + '</h2>';
  template += map(renderNewsItem, newsItems).join('');
  template += '</li>';

  return template;
}

function renderNewsItem(newsItem) {
  var template = '';

  template += '<article class="news-item">';
  template += '<div class="content">' + newsItem.html + '</article>';
  template += '</article>';

  return template;
}

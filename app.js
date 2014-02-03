var fn = {};

fn.first = function(arr) {
  return arr[0];
};

fn.each = function(handler, collection) {
  for (var index = 0; index < collection.length; index++) {
    handler(collection[index], index, collection);
  }
};

fn.reduce = function(handler, collection, accumulator) {
  fn.each(function(value) {
    accumulator = handler(accumulator, value);
  }, collection);

  return accumulator;
};

fn.map = function(handler, collection) {
  return fn.reduce(function(accumulator, value) {
    accumulator.push(handler(value));
    return accumulator;
  }, collection, []);
};

fn.filter = function(handler, collection) {
  return fn.reduce(function(accumulator, item) {
    if (handler(item)) accumulator.push(item);
    return accumulator;
  }, collection, []);
};

fn.find = function(predicate, links) {
  return fn.first(fn.filter(predicate, links));
};

fn.groupBy = function(attribute, collection) {
  var result = {};

  fn.each(function(item) {
    var key = item[attribute];
    result[key] = result[key] || [];
    result[key].push(item);
  }, collection);

  return result;
};

var str = {};

str.removeHash = function(string) {
  return string.replace('#', '');
};

str.leadingPath = function(route) {
  return fn.first(route.split('/'));
};

removeClass = function(elements, className) {
  fn.each(function(element) {
    element.className = element.className.replace(className, '');
  }, elements);
};

window.rootElement = document.getElementById('main');

function route(path) {
  if (routeExists(path)) {
    setTitle(path);
    setTitleImage(path);
    setContent(path);
    menu.setCurrent(path);
  } else {
    window.location.hash = 'about';
  }
}

function setTitle(route) {
  var prefix = menu.linkForRoute(route).innerText
  var suffix = 'Lucy Ramsbottom, Jewellery Designer Maker';

  document.title = [prefix, suffix].join(' - ');
}

function setTitleImage(route) {
  var topLevelRoute = str.leadingPath(route);
  var imageName = str.removeHash(topLevelRoute);
  var imageUrl = 'https://s3-eu-west-1.amazonaws.com/goldfinchjewellery/' + imageName + '.jpg';

  document.getElementById('title-image').src = imageUrl;
}

function routeExists(path) {
  return templateElement(path) !== null;
}

function renderNews() {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) return;

    var json = JSON.parse(xhr.responseText);

    window.rootElement.innerHTML = renderNewsItems(json.newsItems);
  };

  xhr.open('get', 'http://goldfinchjewellery.herokuapp.com/news.json', true);
  xhr.send();
}

function renderNewsItems(newsItems) {
  var groupedNewsItems = fn.groupBy('category', newsItems);
  var categories = Object.keys(groupedNewsItems);
  var template = '';

  template += '<div class="latest-news">';
  template += '<ul class="news-items">';
  template += fn.map(function(category) {
    return renderCategory(category, groupedNewsItems[category]);
  }, categories).join('');
  template += '</ul>';
  template += '</div>';

  return template;
}

function renderCategory(name, newsItems) {
  var template = '';

  template += '<li class="news-category ' + name + '" id="news-' + name + '">';
  template += '<h2 class="category-name">' + name + '</h2>';
  template += fn.map(renderNewsItem, newsItems).join('');
  template += '</li>';

  return template;
}

function renderNewsItem(newsItem) {
  var template = '';

  template += '<article class="news-item">';
  template += '<div class="content">' + newsItem.body + '</article>';
  template += '</article>';

  return template;
}

function templateElement(path) {
  var templateId = str.removeHash(path) + '-template';
  return document.getElementById(templateId);
}

var menu = {};

menu.setCurrent = function(route) {
  var current = document.querySelectorAll('#menu .current');
  removeClass(current, 'current');

  var menuItem = menu.linkForRoute(route).parentNode;
  menuItem.className += ' current';
};

menu.linkForRoute = function(route) {
  var topLevelRoute = str.leadingPath(route);
  var menuLinks = document.querySelectorAll('#menu a');

  return fn.find(function(link) {
    return link.getAttribute('href') === topLevelRoute;
  }, menuLinks);
};

function setContent(path) {
  window.rootElement.innerHTML = '';

  if (path === '#latest-news') {
    renderNews();
  } else {
    var template = templateElement(path).cloneNode(true);
    removeClass([template], 'hidden');

    window.rootElement.appendChild(template);
  }
}

window.onhashchange = function() {
  route(window.location.hash);
};

function setup() {
  if (window.location.hash) {
    route(window.location.hash);
  } else {
    window.location.hash = 'about';
  }
}

setup();

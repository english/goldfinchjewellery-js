window.rootElement = document.getElementById('main');

function setup() {
  if (window.location.hash) {
    route(window.location.hash);
  } else {
    window.location.hash = 'about';
  }
}

function titleFor(route) {
  return menuLinkFromRoute(leadingPath(route)).innerText +
    ' - Lucy Ramsbottom, Jewellery Designer Maker';
}

function menuLinkFromRoute(route) {
  return find(function(link) {
    return link.getAttribute('href') === route;
  }, menu().getElementsByTagName('a'));
}

function route(path) {
  if (routeExists(path)) {
    document.title = titleFor(path);
    setContent(path);
    setCurrent(path);
    setTitleImage(path);
  } else {
    window.location.hash = 'about';
  }
}

function routeExists(path) {
  return templateElement(path) !== null;
}

function renderNews() {
  var div = document.createElement('div');
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

  template += '<li class="news-category ' + name + '" id="news-' + name + '">';
  template += '<h2 class="category-name">' + name + '</h2>';
  template += map(renderNewsItem, newsItems).join('');
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

function template(route) {
  var node = templateElement(route).cloneNode(true);
  removeClass([node], 'hidden');
  return node;
}

function templateElement(path) {
  var templateId = removeHash(path) + '-template';
  return document.getElementById(templateId);
}

function leadingPath(route) {
  return first(route.split('/'));
}

function setTitleImage(route) {
  var imageName = removeHash(leadingPath(route));

  document.getElementById('title-image').src = 'https://s3-eu-west-1.amazonaws.com/goldfinchjewellery/' + imageName + '.jpg';
}

function menu() {
  return document.getElementById('menu');
}

function menuItem(route) {
  return menuLinkFromRoute(route).parentNode;
}

function setCurrent(route) {
  var current = menu().getElementsByClassName('current');
  removeClass(current, 'current');
  addClass(menuItem(leadingPath(route)), 'current');
}

function setContent(path) {
  window.rootElement.innerHTML = '';

  if (path === '#latest-news') {
    renderNews();
  } else {
    var content = template(path);
    window.rootElement.appendChild(content);
  }
}

function cloneElement(element) {
  return element.cloneNode(true);
}

function pageLink(route) {
  var links = menu().getElementsByTagName('a');

  return find(function(link) {
    return link.innerText === page;
  }, links);
}

function pages() {
  return map(function(link) {
    return link.innerText;
  }, menu().getElementsByTagName('a'));
}

function addClass(element, className) {
  element.className += 'current';
}

function removeClass(elements, className) {
  each(function(element) {
    element.className = element.className.replace(className, '');
  }, elements);
}

function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeHash(string) {
  return string.replace('#', '');
}

function toArray(collection) {
  return [].slice.call(collection);
}

window.onhashchange = function() {
  route(window.location.hash);
};

function first(arr) {
  return arr[0];
}

function each(handler, collection) {
  for (var index = 0; index < collection.length; index++) {
    handler(collection[index], index, collection);
  }
}

function reduce(handler, collection, accumulator) {
  each(function(value) {
    accumulator = handler(accumulator, value);
  }, collection);

  return accumulator;
}

function map(handler, collection) {
  return reduce(function(accumulator, value) {
    accumulator.push(handler(value));
    return accumulator;
  }, collection, []);
}

function filter(handler, collection) {
  return reduce(function(accumulator, item) {
    if (handler(item)) accumulator.push(item);
    return accumulator;
  }, collection, []);
}

function find(predicate, links) {
  return first(filter(predicate, links));
}

function groupBy(attribute, collection) {
  var result = {};

  each(function(item) {
    var key = item[attribute];
    result[key] = result[key] || [];
    result[key].push(item);
  }, collection);

  return result;
}

setup();

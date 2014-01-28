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
  return find(menu().getElementsByTagName('a'), function(link) {
    return link.getAttribute('href') === route;
  });
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

function mainElement() {
  return document.getElementById('main');
}

function routeExists(path) {
  return templateElement(path) !== null;
}

function renderNews() {
  var div = document.createElement('div');
  var text = 'Stockists';
  var xhr = new XMLHttpRequest();
  var json;

  xhr.open('get', 'http://goldfinchjewellery.herokuapp.com/news.json', false);
  xhr.onload = function() {
    json = JSON.parse(this.responseText);
  };
  xhr.send();

  text += json.newsItems[0].body;

  div.appendChild(document.createTextNode(text));

  mainElement().appendChild(div);
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
  mainElement().innerHTML = '';

  if (path === '#latest-news') {
    renderNews();
  } else {
    var content = template(path)
    mainElement().appendChild(content);
  }
}

function cloneElement(element) {
  return element.cloneNode(true);
}

function pageLink(route) {
  var links = menu().getElementsByTagName('a');

  return find(links, function(link) {
    return link.innerText === page;
  });
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

function find(links, predicate) {
  return first(filter(predicate, links));
}

setup();

function setup() {
  renderer('');
}

function titleFor(route) {
  return menuLinkFromRoute(route).innerText +
    ' - Lucy Ramsbottom, Jewellery Designer Maker';
}

function menuLinkFromRoute(route) {
  if (route === '') route = '#';

  return find(menu().getElementsByTagName('a'), function(link) {
    return link.getAttribute('href') === route;
  });
}

function renderer(route) {
  document.title = titleFor(route);
  setContent(template(route));
  setCurrent(route);
  setTitleImage(route);
}

function mainElement() {
  return document.getElementById('main');
}

function template(route) {
  if (route === '') route = '#about';
  var templateId = removeHash(route) + '-template';
  var template = document.getElementById(templateId).cloneNode(true);
  removeClass([template], 'hidden');

  return template;
}

function setTitleImage(route) {
  if (route === '') route = '#about';
  document.getElementById('title-image').src = 'images/' + removeHash(route) + '.jpg';
}

function menu() {
  return document.getElementById('menu')
}

function menuItem(route) {
  return menuLinkFromRoute(route).parentNode;
}

function setCurrent(route) {
  var current = menu().getElementsByClassName('current');
  removeClass(current, 'current');
  addClass(menuItem(route), 'current');
}

function setContent(content) {
  mainElement().innerHTML = '';
  mainElement().appendChild(content);
}

function cloneElement(element) {
  return element.cloneNode(true);
}

function find(links, predicate) {
  return first(Array.prototype.filter.call(links, predicate));
}

function pageLink(route) {
  var links = menu().getElementsByTagName('a');

  return find(links, function(link) {
    return link.innerText === page;
  });
}

function pages() {
  return map(menu().getElementsByTagName('a'), function(link) {
    return link.innerText;
  });
}

function addClass(element, className) {
  element.className += 'current';
}

function removeClass(elements, className) {
  each(elements, function(element) {
    element.className = element.className.replace(className, '');
  });
}

function first(arr) {
  return arr[0];
}

function each(seq, fn) {
  Array.prototype.forEach.call(seq, fn);
}

function map(seq, fn) {
  return Array.prototype.map.call(seq, fn);
}

function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeHash(string) {
  return string.replace('#', '');
}

window.onhashchange = function() {
  renderer(window.location.hash);
};

setup();

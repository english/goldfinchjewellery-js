"use strict";

window.ROOT_ELEMENT = document.getElementById('main');
window.ROUTES = [
  'about',
  'latest-news',
  'contact',
  'links',
  'gallery',
  'gallery/peace-doves',
  'gallery/weather',
  'gallery/birds',
  'gallery/commissions',
  'gallery/branches',
  'gallery/woodlands'
];

window.onhashchange = function() {
  var path = window.location.hash.replace('#', '')
  route(path);
};

function setup() {
  if (window.location.hash) {
    var path = window.location.hash.replace('#', '');
    route(path);
  } else {
    window.location.hash = 'about';
  }
}

function route(path) {
  var leadingPath = first(path.split('/'));

  if (routeExists()) {
    setTitle();
    setTitleImage();
    setContent();
    setCurrentMenuItem();
  } else {
    window.location.hash = 'about';
  }

  function routeExists() {
    return !!find(function(route) {
      return path === route;
    }, window.ROUTES);
  }

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

  function setContent() {
    window.ROOT_ELEMENT.innerHTML = '';

    if (path === 'latest-news') {
      renderNews();
    } else {
      var templateId = path + '-template';
      var template = document.getElementById(templateId).cloneNode(true);

      removeClass([template], 'hidden');

      window.ROOT_ELEMENT.appendChild(template);
    }
  }

  function menuLink() {
    var menuLinks = document.querySelectorAll('#menu a');

    return find(function(link) {
      return link.getAttribute('href').replace('#', '') === leadingPath;
    }, menuLinks);
  }

  function removeClass(elements, className) {
    each(function(element) {
      element.className = element.className.replace(className, '');
    }, elements);
  }
}

setup();

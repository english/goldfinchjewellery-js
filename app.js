"use strict";

window.rootElement = document.getElementById('main');
window.routes = [
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
    }, window.routes);
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
    window.rootElement.innerHTML = '';

    if (path === 'latest-news') {
      renderNews();
    } else {
      var templateId = path + '-template';
      var template = document.getElementById(templateId).cloneNode(true);

      removeClass([template], 'hidden');

      window.rootElement.appendChild(template);
    }
  }

  function menuLink() {
    var menuLinks = document.querySelectorAll('#menu a');

    return find(function(link) {
      return link.getAttribute('href').replace('#', '') === leadingPath;
    }, menuLinks);
  }
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

function removeClass(elements, className) {
  each(function(element) {
    element.className = element.className.replace(className, '');
  }, elements);
}

setup();

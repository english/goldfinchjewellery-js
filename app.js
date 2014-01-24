;(function() {
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
      setContent(template(path));
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
    route(window.location.hash);
  };

  setup();
})();

"use strict";

function setup() {
  if (window.location.hash) {
    var path = window.location.hash.replace('#', '');
    Router.route(path);
  } else {
    window.location.hash = 'about';
  }
}

window.onhashchange = setup;
setup();

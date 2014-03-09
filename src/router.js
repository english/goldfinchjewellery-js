Router = {
  current: null,
  routes: {},

  register: function(path, options) {
    var view;
    options = options || {};

    Router.routes[path] = {
      view: options.view || simpleView(path),
      model: options.model
    };
  },

  isRouteRegistered: function(path) {
    return Router.routes.hasOwnProperty(path);
  },

  route: function(path) {
    if (Router.isRouteRegistered(path)) {
      applicationView(path);

      var currentRoute = Router.routes[path];
      var model = currentRoute.model;
      var view = currentRoute.view;

      if (model) model(view);
      else view();
    } else {
      window.location.hash = 'about';
    }
  }
};

Router.register('about');
Router.register('latest-news', { view: newsView, model: News.find });
Router.register('contact');
Router.register('links');
Router.register('gallery');

Router.register('gallery/peace-doves', {
  view: galleryShowView,
  model: function(callback) {
    Gallery.find('peace-doves', callback);
  }
});

Router.register('gallery/weather', {
  view: galleryShowView,
  model: function(callback) {
    Gallery.find('weather', callback);
  }
});

Router.register('gallery/birds', {
  view: galleryShowView,
  model: function(callback) {
    Gallery.find('birds', callback);
  }
});

Router.register('gallery/commissions', {
  view: galleryShowView,
  model: function(callback) {
    Gallery.find('commissions', callback);
  }
});

Router.register('gallery/branches', {
  view: galleryShowView,
  model: function(callback) {
    Gallery.find('branches', callback);
  }
});

Router.register('gallery/woodlands', {
  view: galleryShowView,
  model: function(callback) {
    Gallery.find('woodlands', callback);
  }
});

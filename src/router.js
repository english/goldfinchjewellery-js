Router = {
  current: null,
  routes: {},

  register: function(path, view) {
    Router.routes[path] = view || simpleView(path);
  },

  isRouteRegistered: function(path) {
    return Router.routes.hasOwnProperty(path);
  },

  route: function(path) {
    if (Router.isRouteRegistered(path)) {
      applicationView(path)
      Router.routes[path]();
    } else {
      window.location.hash = 'about';
    }
  }
};

Router.register("about");
Router.register("latest-news", newsView);
Router.register("contact");
Router.register("links");
Router.register("gallery");
Router.register('gallery/peace-doves');
Router.register('gallery/weather');
Router.register('gallery/birds');
Router.register('gallery/commissions');
Router.register('gallery/branches');
Router.register('gallery/woodlands');

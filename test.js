;(function() {
  if (window._phantom && !HTMLElement.prototype.click) {
    HTMLElement.prototype.click = function() {
      var ev = document.createEvent('MouseEvent');
      ev.initMouseEvent(
        'click', true, true,
        window, null,
        0, 0, 0, 0,
        false, false, false, false,
        0, null
      );
      this.dispatchEvent(ev);
    };
  }

  mocha.setup('bdd');
  chai.should();

  function menuItem(page) {
    return Array.prototype.filter.call(document.getElementById('menu').getElementsByTagName('a'), function(link) {
      return link.innerText === page;
    })[0];
  }

  function pageContent() {
    return document.getElementById('main');
  }

  function async(fn, done) {
    setTimeout(function() {
      fn();
      done();
    }, 0);
  }

  beforeEach(function(done) {
    menuItem('About').click();

    setTimeout(done, 0);
  });

  describe('about', function() {
    it('is shown by default', function() {
      pageContent().innerText.should.contain('Having gained');
      menuItem('About').parentNode.className.should.include('current');
    });

    it('has a menu link', function(done) {
      menuItem('About').click();

      async(function() {
        pageContent().innerText.should.contain('Having gained');
        menuItem('About').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title image', function(done) {
      menuItem('About').click();

      async(function() {
        document.getElementById('title-image').src.should.include('about');
      }, done);
    });

    it('is routed with #', function(done) {
      menuItem('Contact').click();

      setTimeout(function() {
        window.location.hash = '';

        async(function() {
          pageContent().innerText.should.contain('Having gained');
        }, done);
      }, 5);
    });
  });

  describe('gallery', function() {
    it('is hidden by default', function() {
      pageContent().innerText.should.not.contain('Peace Doves');
      menuItem('Gallery').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      menuItem('Gallery').click();

      async(function() {
        pageContent().innerText.should.contain('Peace Doves');
        menuItem('Gallery').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title image', function(done) {
      menuItem('Gallery').click();

      async(function() {
        document.getElementById('title-image').src.should.include('gallery');
      }, done);
    });

    it('is routed with #gallery', function(done) {
      window.location.hash = 'gallery'

      async(function() {
        pageContent().innerText.should.contain('Peace Doves');
      }, done);
    });
  });

  describe('latest news', function() {
    it('is hidden by default', function() {
      pageContent().innerText.should.not.contain('Stockists');
      menuItem('Latest News').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      menuItem('Latest News').click();

      async(function() {
        pageContent().innerText.should.contain('Stockists');
        menuItem('Latest News').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      menuItem('Latest News').click();

      async(function() {
        document.title.should.include('Latest News');
      }, done);
    });

    it('has a title image', function(done) {
      menuItem('Latest News').click();

      async(function() {
        document.getElementById('title-image').src.should.include('news');
      }, done);
    });

    it('is routed with #latest-news', function(done) {
      window.location.hash = 'latest-news';

      async(function() {
        pageContent().innerText.should.contain('Stockists');
      }, done);
    });
  });

  describe('links', function() {
    it('is hidden by default', function() {
      pageContent().innerText.should.not.contain('Association of Contemporary Jewellery');
      menuItem('Links').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      menuItem('Links').click();

      async(function() {
        pageContent().innerText.should.contain('Association of Contemporary Jewellery');
        menuItem('Links').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      menuItem('Links').click();

      async(function() {
        document.title.should.include('Links');
      }, done);
    });

    it('is routed with #links', function(done) {
      window.location.hash = 'links';

      async(function() {
        pageContent().innerText.should.contain('Association of Contemporary Jewellery');
      }, done);
    });
  });

  describe('contact', function() {
    it('is hiddent by default', function() {
      pageContent().innerText.should.not.contain('Tel');
      menuItem('Contact').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      menuItem('Contact').click();

      async(function() {
        pageContent().innerText.should.contain('Tel');
        pageContent().innerText.should.contain('Email');
        menuItem('Contact').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      menuItem('Contact').click();

      async(function() {
        document.title.should.include('Contact');
      }, done);
    });

    it('is routed with #contact', function(done) {
      window.location.hash = 'contact';

      async(function() {
        pageContent().innerText.should.contain('Tel');
        pageContent().innerText.should.contain('Email');
      }, done);
    });
  });

  if (window.location.port === '7357') {
    mocha.checkLeaks();
    mocha.run();
  }
})();

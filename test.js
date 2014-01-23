;(function() {
  mocha.setup('bdd');
  chai.should();

  function click(element) {
    var ev = document.createEvent('MouseEvent');
    ev.initMouseEvent(
      'click', true, true,
      window, null,
      0, 0, 0, 0,
      false, false, false, false,
      0, null
    );
    element.dispatchEvent(ev);
  }

  function menuItem(page) {
    return Array.prototype.filter.call(document.getElementById('menu').getElementsByTagName('a'), function(link) {
      return link.innerText === page;
    })[0];
  }

  function pageContent() {
    return document.getElementById('main');
  }

  function pageText() {
    return pageContent().innerText;
  }

  function async(fn, done) {
    setTimeout(function() {
      fn();
      done();
    }, 0);
  }

  beforeEach(function(done) {
    click(menuItem('About'));
    setTimeout(done, 0);
  });

  describe('about', function() {
    it('is shown by default', function() {
      pageText().should.contain('Having gained');
      menuItem('About').parentNode.className.should.include('current');
    });

    it('has a menu link', function(done) {
      click(menuItem('About'));

      async(function() {
        pageText().should.contain('Having gained');
        menuItem('About').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title image', function(done) {
      click(menuItem('About'));

      async(function() {
        document.getElementById('title-image').src.should.include('about');
      }, done);
    });

    it('is routed with #about', function(done) {
      window.location.hash = 'about';

      async(function() {
        pageText().should.contain('Having gained');
      }, done);
    });
  });

  describe('gallery', function() {
    it('is hidden by default', function() {
      pageText().should.not.contain('Peace Doves');
      menuItem('Gallery').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      click(menuItem('Gallery'));

      async(function() {
        pageText().should.contain('Peace Doves');
        menuItem('Gallery').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title image', function(done) {
      click(menuItem('Gallery'));

      async(function() {
        document.getElementById('title-image').src.should.include('gallery');
      }, done);
    });

    it('is routed with #gallery', function(done) {
      window.location.hash = 'gallery';

      async(function() {
        pageText().should.contain('Peace Doves');
      }, done);
    });
  });

  describe('galleries', function() {
    function galleryItem(gallery) {
      return Array.prototype.filter.call(pageContent().getElementsByTagName('a'), function(link) {
        return link.innerText === gallery;
      })[0];
    }

    describe('peace doves', function() {
      it('can be navigated to', function(done) {
        click(menuItem('Gallery'));

        setTimeout(function() {
          click(galleryItem('Peace Doves'));

          async(function() {
            pageText().should.contain('Sterling silver ring with paper and resin.');
          }, done);
        }, 0);
      });

      it('lives on #gallery/peace-doves', function(done) {
        document.location.hash = 'gallery/peace-doves';

        async(function() {
          pageText().should.contain('Sterling silver ring with paper and resin.');
        }, done);
      });
    });

    describe('weather', function() {
      it('can be navigated to', function(done) {
        click(menuItem('Gallery'));

        setTimeout(function() {
          click(galleryItem('Weather'));

          async(function() {
            pageText().should.contain('');
          }, done);
        }, 0);
      });

      it('lives on #gallery/peace-doves', function(done) {
        document.location.hash = 'gallery/weather';

        async(function() {
          pageText().should.contain('Oxidised silver and oval Labradorite cloud pendant.');
        }, done);
      });
    });

    describe('birds', function() {
      it('can be navigated to', function(done) {
        click(menuItem('Gallery'));

        setTimeout(function() {
          click(galleryItem('Birds'));

          async(function() {
            pageText().should.contain('Round Peridot and fine silver earrings.');
          }, done);
        }, 0);
      });

      it('lives on #gallery/birds', function(done) {
        document.location.hash = 'gallery/birds';

        async(function() {
          pageText().should.contain('Round Peridot and fine silver earrings.');
        }, done);
      });
    });

    describe('commissions', function() {
      it('can be navigated to', function(done) {
        click(menuItem('Gallery'));

        setTimeout(function() {
          click(galleryItem('Commissions'));

          async(function() {
            pageText().should.contain('Diamond and recycled 18ct yellow gold ring.');
          }, done);
        }, 0);
      });

      it('lives on #gallery/commissions', function(done) {
        document.location.hash = 'gallery/commissions';

        async(function() {
          pageText().should.contain('Diamond and recycled 18ct yellow gold ring.');
        }, done);
      });
    });

    describe('branches', function() {
      it('can be navigated to', function(done) {
        click(menuItem('Gallery'));

        setTimeout(function() {
          click(galleryItem('Branches'));

          async(function() {
            pageText().should.contain('Sterling silver, wood, resin and suede brooch.');
          }, done);
        }, 0);
      });

      it('lives on #gallery/branches', function(done) {
        document.location.hash = 'gallery/branches';

        async(function() {
          pageText().should.contain('Sterling silver, wood, resin and suede brooch.');
        }, done);
      });
    });

    describe('woodlands', function() {
      it('can be navigated to', function(done) {
        click(menuItem('Gallery'));

        setTimeout(function() {
          click(galleryItem('Woodlands'));

          async(function() {
            pageText().should.contain('Silver acorn pendant.');
          }, done);
        }, 0);
      });

      it('lives on #gallery/woodlands', function(done) {
        document.location.hash = 'gallery/woodlands';

        async(function() {
          pageText().should.contain('Silver acorn pendant.');
        }, done);
      });
    });
  });

  describe('latest news', function() {
    it('is hidden by default', function() {
      pageText().should.not.contain('Stockists');
      menuItem('Latest News').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      click(menuItem('Latest News'));

      async(function() {
        pageText().should.contain('Stockists');
        menuItem('Latest News').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      click(menuItem('Latest News'));

      async(function() {
        document.title.should.include('Latest News');
      }, done);
    });

    it('has a title image', function(done) {
      click(menuItem('Latest News'));

      async(function() {
        document.getElementById('title-image').src.should.include('news');
      }, done);
    });

    it('is routed with #latest-news', function(done) {
      window.location.hash = 'latest-news';

      async(function() {
        pageText().should.contain('Stockists');
      }, done);
    });
  });

  describe('links', function() {
    it('is hidden by default', function() {
      pageText().should.not.contain('Association of Contemporary Jewellery');
      menuItem('Links').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      click(menuItem('Links'));

      async(function() {
        pageText().should.contain('Association of Contemporary Jewellery');
        menuItem('Links').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      click(menuItem('Links'));

      async(function() {
        document.title.should.include('Links');
      }, done);
    });

    it('is routed with #links', function(done) {
      window.location.hash = 'links';

      async(function() {
        pageText().should.contain('Association of Contemporary Jewellery');
      }, done);
    });
  });

  describe('contact', function() {
    it('is hiddent by default', function() {
      pageText().should.not.contain('Tel');
      menuItem('Contact').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      click(menuItem('Contact'));

      async(function() {
        pageText().should.contain('Tel');
        pageText().should.contain('Email');
        menuItem('Contact').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      click(menuItem('Contact'));

      async(function() {
        document.title.should.include('Contact');
      }, done);
    });

    it('is routed with #contact', function(done) {
      window.location.hash = 'contact';

      async(function() {
        pageText().should.contain('Tel');
        pageText().should.contain('Email');
      }, done);
    });
  });

  if (window.location.port === '7357') {
    mocha.checkLeaks();
    mocha.run();
  }
})();

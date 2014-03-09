describe('simple pages', function() {
  describe('about', function() {
    it('is shown by default', function() {
      pageText().should.contain('Having gained');
      navItem('About').parentNode.className.should.include('current');
    });

    it('has a menu link', function(done) {
      click(navItem('About'));

      async(function() {
        pageText().should.contain('Having gained');
        navItem('About').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title image', function(done) {
      click(navItem('About'));

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
      navItem('Gallery').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      click(navItem('Gallery'));

      async(function() {
        pageText().should.contain('Peace Doves');
        navItem('Gallery').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title image', function(done) {
      click(navItem('Gallery'));

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

  describe('links', function() {
    it('is hidden by default', function() {
      pageText().should.not.contain('Association of Contemporary Jewellery');
      navItem('Links').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      click(navItem('Links'));

      async(function() {
        pageText().should.contain('Association of Contemporary Jewellery');
        navItem('Links').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      click(navItem('Links'));

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
      navItem('Contact').parentNode.className.should.not.include('current');
    });

    it('has a menu link', function(done) {
      click(navItem('Contact'));

      async(function() {
        pageText().should.contain('Tel');
        pageText().should.contain('Email');
        navItem('Contact').parentNode.className.should.include('current');
      }, done);
    });

    it('has a title', function(done) {
      click(navItem('Contact'));

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
});

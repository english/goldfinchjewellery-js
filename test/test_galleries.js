describe('galleries', function() {
  beforeEach(function() {
    var url = 'https://goldfinchjewellery.herokuapp.com/jewellery.json';
    this.server = sinon.fakeServer.create();
    this.server.respondWith('OPTIONS', url, [
      200, { "Access-Control-Allow-Origin": "*" }, ''
    ]);

    var response = {
      jewellery: [{
        gallery: 'birds',
        image_path: '/robin.jpg',
        name: 'robin',
        description: 'What a lovely robin'
      }, {
        gallery: 'Peace Doves',
        image_path: '/dove.jpg',
        name: 'dove',
        description: 'What a lovely dove'
      }, {
        gallery: 'Peace Doves',
        image_path: '/another-dove.jpg',
        name: 'another dove',
        description: 'Another lovely dove'
      }]
    };

    this.server.respondWith('GET', url, [
      200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }, JSON.stringify(response)
    ]);
  });

  afterEach(function() {
    this.server.restore();
  });

  describe('peace doves', function() {
    it('deserialised the json', function(done) {
      Router.route('gallery/peace-doves');
      this.server.respond();

      async(function() {
        pageText().should.contain('What a lovely dove');
      }, done);
    });
  });

  describe('birds', function() {
    it('deserialised the json', function(done) {
      Router.route('gallery/birds');
      this.server.respond();

      async(function() {
        pageText().should.contain('What a lovely robin');
      }, done);
    });
  });
});

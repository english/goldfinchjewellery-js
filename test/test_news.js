describe('latest news', function() {
  beforeEach(function() {
    var url = 'http://goldfinchjewellery.herokuapp.com/news.json';

    this.server = sinon.fakeServer.create();

    this.server.respondWith('OPTIONS', url, [
      200, { "Access-Control-Allow-Origin": "*" }, ''
    ]);

    var response = {
      newsItems: [
        { body: 'I have a new stockist', category: 'stockists' },
        { body: 'I won an award',        category: 'awards' },
        { body: 'I won another award!',  category: 'awards' }
      ]
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

  it('is hidden by default', function() {
    pageText().should.not.contain('Stockists');
    navItem('Latest News').parentNode.className.should.not.include('current');
  });

  it('has a title', function(done) {
    click(navItem('Latest News'));

    async(function() {
      document.title.should.include('Latest News');
    }, done);
  });

  it('has a title image', function(done) {
    click(navItem('Latest News'));

    async(function() {
      document.getElementById('title-image').src.should.include('news');
    }, done);
  });

  it('is routed with #latest-news', function(done) {
    window.location.hash = 'latest-news';

    async(function() {
      document.title.should.include('Latest News');
    }, done);
  });

  it('shows what the api tells it to', function(done) {
    route('latest-news');
    this.server.respond();

    async(function() {
      document.getElementById('news-stockists').innerText.should.include('I have a new stockist');
      document.getElementById('news-awards').innerText.should.include('I won an award');
      document.getElementById('news-awards').innerText.should.include('I won another award!');
    }, done);
  });
});

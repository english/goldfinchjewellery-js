describe('latest news', function() {
  beforeEach(function() {
    var url = 'https://goldfinchjewellery.herokuapp.com/news.json';

    this.server = sinon.fakeServer.create();

    this.server.respondWith('OPTIONS', url, [
      200, { "Access-Control-Allow-Origin": "*" }, ''
    ]);

    var response = {
      news: [{
        html: '<p>I have a new stockist</p>',
        category: 'Stockists'
      }, {
        html: 'I won an award',
        category: 'Awards'
      }, {
        html: 'I won another award!',
        category: 'Awards'
      }, {
        html: "I will be attending a new event",
        category: "Events & Exhibitions"
      }, {
        html: "I'm in the news!" +
              '<a href="http://google.com/">a link</a>' +
              '<img src="https://www.google.co.uk/images/srpr/logo11w.png">',
        category: "Press"
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
      document.getElementById("news-events-and-exhibitions").innerHTML.should.include("I will be attending a new event");
      document.getElementById("news-press").innerHTML.should.include("I'm in the news");
    }, done);
  });

  it('compiles the markdown body to html', function() {
    var pressHTML = document.getElementById("news-press").innerHTML;
    pressHTML.should.include('<a href="http://google.com/">a link</a>');
    pressHTML.should.include('<img src="https://www.google.co.uk/images/srpr/logo11w.png">');
  });
});

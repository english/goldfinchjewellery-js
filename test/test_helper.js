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

function navItem(page) {
  return find(function(link) {
    return link.innerText === page;
  }, document.getElementById('menu').getElementsByTagName('a'));
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
  click(navItem('About'));
  setTimeout(done, 0);
});

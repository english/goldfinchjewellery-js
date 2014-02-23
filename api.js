FIXTURE = {
  newsItems: [{
    body: "I have a new stockist",
    category: "Stockists"
  }, {
    body: "I will be attending a new event",
    category: "Events and Exhibitions"
  }, {
    body: "I won an award",
    category: "Awards"
  }, {
    body: "I won another award!",
    category: "Awards"
  }, {
    body: "I am in the news!",
    category: "Press"
  }]
};

require('http').createServer(function(request, response) {
  if (request.url === "/news.json") {
    response.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    response.end(JSON.stringify(FIXTURE));
  } else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end("Not found");
  }
}).listen(3001);

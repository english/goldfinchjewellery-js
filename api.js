FIXTURE = {
  "news": [
    {
      "category": "Events & Exhibitions",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Spirit exhibition at Heart Gallery, The Arts Centre</p>\n\n  </div>\n\n\n</article>\n",
      "id": 3795479
    },
    {
      "category": "Stockists",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>New stockist at Red Barn Gallery, Milnthorpe</p>\n\n  </div>\n\n\n</article>\n",
      "id": 11604623
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Goldsmiths\u2019 Craft and Design Council</p>\n\n  </div>\n\n\n</article>\n",
      "id": 286223101
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>British Jewellers\u2019 Association, 2002</p>\n\n  </div>\n\n\n</article>\n",
      "id": 297079999
    },
    {
      "category": "Press",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>In the press</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287166
    },
    {
      "category": "Events & Exhibitions",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>\u2018Spirit\u2019 exhibition at Heart Gallery, The Arts Centre, Hebden Bridge, North Yorkshire. 23rd September - 31st October 2012.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287169
    },
    {
      "category": "Events & Exhibitions",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Great Northern Contemporary Craft Fair 2012 in Hardman Square, Spinningfields, Manchester. 4th - 7th October. greatnorthernevents.co.uk</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287170
    },
    {
      "category": "Events & Exhibitions",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Stockport Designer Crafts Show 2012 at Stockport Art Gallery,Wellington Road South, Stockport. 24th November - 27th January.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287171
    },
    {
      "category": "Events & Exhibitions",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Christmas Craft Market at The Brewery Arts Centre, Kendal, Cumbria. 30th November - 2nd December 2012.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287172
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Goldsmiths\u2019 Craft and Design Council. Craftsmanship and Design Awards 2011. \u2018Commended\u2019 for Fashion Jewellery Production.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287173
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Goldsmiths\u2019 Craft and Design Council. Craftsmanship and Design Awards 2005. \u2018Commended\u2019 for 3D production jewellery.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287174
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Goldsmiths\u2019 Council. Craftsmanship and Design Awards 2003. \u2018Silver\u2019 for finished pieces.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287175
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>British Jewellers\u2019 Association, 2002, Certificate of Merit for Higher National Diploma in Jewellery and Silversmithing, 2nd year student \u2013 1st prize.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287176
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>B.J.A. 2001, Commendation Award for H.N.D. in Jewellery and Silversmithing, 1st year student.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287177
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>B.J.A. 2001, Awarded the travel bursary.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287178
    },
    {
      "category": "Awards",
      "html": "<article class=\"news-item\">\n  <div class=\"content\">\n  <p>Arthur Price of England Design Competition 2001, 1st prize for designing a bowl, which was produced and sold by the Arthur Price Company.</p>\n\n  </div>\n\n\n</article>\n",
      "id": 1036287179
    }
  ]
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

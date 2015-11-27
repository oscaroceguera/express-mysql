var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

var api = require('./api/routes/index.js');

app.use('/api', api);

app.listen(port, function() {
  console.log("✔ Express server listening on port %d in %s mode", port, app.get('env'));
});

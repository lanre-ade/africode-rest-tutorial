var express = require('express');
var app = express();

var validParam = function(val, res){
  if(isNaN(val)){ // if paremeter is not a number, its invalid
    res.status(400).json({
      result: null,
      message: "'"+val+"' is not a number",
      error: "Bad Parameter",
      status: 400
    }).end(); // return a 400 Error and end request
    return false;
  }
  return true;
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/calculator.html'); // send our html file
})

// Simple endpoint to handle multiplication
app.get('/api/v1/multiply', function (req, res) {
  if(validParam(req.query.a, res) && validParam(req.query.b, res)){
    var a  = parseFloat(req.query.a);
    var b  = parseFloat(req.query.b);
    var result = a * b;
    res.json({
      result: result,
      message: "",
      error: "",
      status: 200
    });
  }
})

// Simple endpoint to handle division
app.get('/api/v1/divide', function (req, res) {
  if(validParam(req.query.a, res) && validParam(req.query.b, res)){
    var a  = parseFloat(req.query.a);
    var b  = parseFloat(req.query.b);
    var result = a / b;
    res.json({
      result: result,
      message: "",
      error: "",
      status: 200
    });
  }
})

// Simple endpoint to handle addition
app.get('/api/v1/add', function (req, res) {
  if(validParam(req.query.a, res) && validParam(req.query.b, res)){
    var a  = parseFloat(req.query.a);
    var b  = parseFloat(req.query.b);
    var result = a + b;
    res.json({
      result: result,
      message: "",
      error: "",
      status: 200
    });
  }
})

// Simple endpoint to handle subtraction
app.get('/api/v1/subtract', function (req, res) {
  validParam(req.query.a, res);
  validParam(req.query.b, res);
  var a  = parseFloat(req.query.a);
  var b  = parseFloat(req.query.b);
  var result = a - b;
  res.json({
    result: result,
    message: "",
    error: "",
    status: 200
  });
})

// Simple error handler
app.use(function(err, req, res, next){
  console.log(err);
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({
    result: null,
    message: "Something broke!",
    error: "Internal Server Error",
    status: 500
  });
});

// Fall back handler for 404s
app.use(function(req, res, next){
  res.status(404);
  // respond with json
  if (req.accepts('json')) {
    res.json({
      result: null,
      message: "Endpoint does not exist on this server",
      error: "Not Found",
      status: 404
    });
    return;
  }

  // default html
  res.send('<h1>Not found<h1>');
});

var _port = 8000
var server = app.listen(_port, function () {
  console.log("Calculator app listening on http://localhost:%s", _port)
})

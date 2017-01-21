var express = require('express');
var fs = require("fs");
var app = express();

var validParam = function(val, res){
  if(isNaN(val)){
    res.status(400).json({
      result: null,
      message: "'"+val+"' is not a number",
      error: "Bad Parameter",
      status: 400
    }).end();
    return false;
  }
  return true;
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/calculator.html');
})

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
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

var _port = 8000
var server = app.listen(_port, function () {

  var host = server.address().address || "localhost";
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

})

var express = require('express');
var fs = require("fs");
var app = express();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/calculator.html');
})

app.get('/multiply', function (req, res) {
  // TODO:: error check request parameters
  var a  = parseFloat(req.query.a);
  var b  = parseFloat(req.query.b);
  var result = a * b;
  res.end( JSON.stringify({
    result: result,
    message: "",
    error: "",
    status: 200
  }));
})

app.get('/divide', function (req, res) {
  // TODO:: error check request parameters
  var a  = parseFloat(req.query.a);
  var b  = parseFloat(req.query.b);
  var result = a / b;
  res.end( JSON.stringify({
    result: result,
    message: "",
    error: "",
    status: 200
  }));
})

app.get('/add', function (req, res) {
  // TODO:: error check request parameters
  var a  = parseFloat(req.query.a);
  var b  = parseFloat(req.query.b);
  var result = a + b;
  res.end( JSON.stringify({
    result: result,
    message: "",
    error: "",
    status: 200
  }));
})

app.get('/subtract', function (req, res) {
  // TODO:: error check request parameters
  var a  = parseFloat(req.query.a);
  var b  = parseFloat(req.query.b);
  var result = a - b;
  res.end( JSON.stringify({
    result: result,
    message: "",
    error: "",
    status: 200
  }));
})

var _port = 8000
var server = app.listen(_port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

})

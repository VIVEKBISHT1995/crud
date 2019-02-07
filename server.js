var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var port = 8081;
var app = express();
app.use(express.static("public"));
app.use(bodyParser.json());

var serverData = [
  [
    {
      name: "username",
      value: "hariom"
    },
    {
      name: "password",
      value: "password value"
    },
    {
      name: "email",
      value: "hariom@email"
    }
  ]
];

app.post("/submit", function(req, res) {
  var response = {
    success: true
  };
  serverData.push(req.body);
  res.send(response);
});

app.get("/getData", function(req, res) {
  res.send(serverData);
});

app.listen(port, function() {
  console.log(`Server started at ${port}`);
});

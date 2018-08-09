//Import the necessary libraries/declare the necessary objects
var express = require("express"),
  fs = require('fs')
  url = require('url');
//var bodyParser = require("body-parser");
var app = express();
var cors = require('cors');

app.use(cors())
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());


app.post('/', function(request, respond) {
    var string = request.body.values;
    console.log(request.body.values);

    var body = '';
    filePath = '../data.csv'
    //prevArray
    //filePath = __dirname + '/public/data.txt';
    // request.on('data', function(data) {
    //     body += data;
    // });
    //
    // request.on('end', function (){


      // var newBody = JSON.stringify(body);
      // newBody.slice(0,9);
      // newBody.slice(-2,-1);
        fs.appendFile(filePath, request.body.values + "\r\n", function() {
            respond.end();
        });
    // });
});

//Start the server and make it listen for connections on port 8080
app.listen(8080);

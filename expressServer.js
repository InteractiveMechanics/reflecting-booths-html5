//Import the necessary libraries/declare the necessary objects
var express = require("express"),
  fs = require('fs')
  url = require('url');
var myParser = require("body-parser");
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(cors())
app.use(myParser.urlencoded({extended : true}));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.text());


app.post('/', function(request, respond) {
    var body = '';
    filePath = '../data.csv'
    //prevArray
    //filePath = __dirname + '/public/data.txt';
    request.on('data', function(data) {
        body += data;
        console.log(body);
        // body.slice(0,9);
        // body.slice(-2,-1);
        console.log(request.body);
    });

    request.on('end', function (){
        fs.appendFile(filePath, body + "\r\n", function() {
            respond.end();
        });
    });
});

//Start the server and make it listen for connections on port 8080
app.listen(8080);

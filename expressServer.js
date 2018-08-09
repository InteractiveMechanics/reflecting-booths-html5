//Import the necessary libraries/declare the necessary objects
var express = require("express"),
  fs = require('fs')
  url = require('url');
var myParser = require("body-parser");
var app = express();
var cors = require('cors')

app.use(cors())
app.use(myParser.urlencoded({extended : true}));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));


app.post('/', function(request, respond) {
    var body = '';
    filePath = '../data.csv'
    //prevArray
    //filePath = __dirname + '/public/data.txt';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.appendFile(filePath, body + "\r\n", function() {
            respond.end();
        });
    });
});

//Start the server and make it listen for connections on port 8080
app.listen(8080);

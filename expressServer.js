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
    var header = "uuid, datetime, language, eyesfree, firstname, lastname, email, geonameid, location, usage, age, exhibiiton, remembrance";

    filePath = '../data.csv';
    if (fs.existsSync(filePath)) {
        fs.appendFile(filePath, request.body.values + "\r\n", function() {
            respond.end();
        });
    } else {
        fs.appendFile(filePath, header + "\r\n" + request.body.values + "\r\n", function() {
            respond.end();
        });
    }
});

//Start the server and make it listen for connections on port 8080
app.listen(8080);

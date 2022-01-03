var port = parseInt(process.env['APP_PORT'] || "8082");
var appName = process.env['APP_NAME'] || 'Awesome-lucky-draw';
var express = require('express');
var app = express();
var path = require('path');
app.get('/' + appName, function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.use('/' + appName, express.static(__dirname + '/public'));
app.listen(port, 'localhost', function () {
    console.log('Service started at http://localhost:' + port + '/' + appName + '/');
});
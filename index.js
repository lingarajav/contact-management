var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var contactCtrl = require('./controller/contact.js');

app.post('/contact/save', function(request, response) {
	contactCtrl.save(request, response);
});

app.get('/contact/get/all', function(request, response) {
	contactCtrl.getAll(response);
});
app.listen(port);

console.log('Server connected at ', port);
var express = require('express');
var app = express();
var port = process.env.PORT || 3000

var controller = require('./controller');

//setting up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controller
controller(app);

//listen to port
app.listen(port);
console.log('Port used is ' + port);
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//git add . then git commit -am "make it better" then git push heroku master
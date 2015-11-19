///////////
// SET UP
///////////
var express  = require('express');
var app      = express();                   // create our app w/ express
var mongoose = require('mongoose');         // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var port = process.env.PORT || 8080;

///////////
// CONFIG
///////////
mongoose.connect('mongodb://localhost/treatyoself');

app.use(express.static(__dirname + '/client/app'));             // set the static files location /client/app/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


////////////////
// CONTROLLERS
////////////////
var session = require('./server/sessions/sessionController.js');
var user = require('./server/users/userController.js');
var task = require('./server/tasks/taskController.js');
var treat = require('./server/treats/treatController.js');


///////////
// ROUTES
///////////
// AUTH + SESSIONS
app.post('/api/sessions', session.login);

// USERS
app.post('/api/users', user.create);

// TASKS
app.get('/api/tasks', task.get);
app.post('/api/tasks', task.create);
app.post('/api/tasks/edit', task.edit);

// TREATS
app.get('/api/treats', treat.get);
app.post('/api/treats/', treat.create);
app.post('/api/treats/edit', treat.edit);


/////////////////
// LOAD ANGULAR
/////////////////
// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
  res.sendfile('./client/app/index.html');
});


///////////
// LISTEN
///////////
app.listen(port, function() {
  console.log("App listening on port %d", port);
});

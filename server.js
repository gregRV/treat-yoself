///////////
// SET UP
///////////
var express  = require('express');
var app      = express();                   // create our app w/ express
var mongoose = require('mongoose');         // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


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


///////////
// MODELS
///////////
var User = require('./server/users/userModel.js');
var Task = require('./server/tasks/taskModel.js');


///////////
// ROUTES
///////////

// AUTH + SESSIONS
app.post('/api/sessions', function(req, res) {
  var user = req.body;

  User.findOne({
    email: user.email
  }, function(err, found) {
    if (err) {
      console.log('ERROR:', err);
      res.send(err);
    }
    console.log('FOUND:', found);
    res.json(found);
  })
});

// USERS
app.post('/api/users', function(req, res) {
  var user = new User();
  user.username = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  console.log('USER AFTER BUILDING', user);

  user.save(function(err){
    if (err) {
      console.log('ERROR:', err);
      res.send(err);
    }
    res.json(user);
  })
});

// TASKS
app.get('/api/tasks', function(req, res) {
  Task.find({},
    function(err, found) {
      if (err) {
        console.log('ERROR:', err);
        res.send(err);
      }
      console.log('FOUND:', found);
      res.json(found);
    })
});

app.post('/api/tasks', function(req, res) {
  var sentTask = req.body;

  var task = new Task();
  task.name = sentTask.name;
  task.description = sentTask.description;
  task.reward = sentTask.reward;
  task.priority = sentTask.priority;
  task.complete = false;

  task.save(function(err){
    if (err) {
      console.log('ERROR:', err);
      res.send(err);
    }
    res.json(task);
  });
});


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
app.listen(8080);
console.log("App listening on port 8080");

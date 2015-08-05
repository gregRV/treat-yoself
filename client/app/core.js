var treatyoself = angular.module('treatyoself', [
  'ngRoute'
])
.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthCtrl',
    })
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'AuthCtrl',
    })
    .when('/tasks', {
      templateUrl: '/tasks/tasks.html',
      controller: 'TaskCtrl'
    })
    .when('/tasks/new', {
      templateUrl: '/tasks/newTask.html',
      controller: 'TaskCtrl'
    })
    .when('/treats/new', {
      templateUrl: '/treats/newTreat.html',
      controller: 'TreatCtrl'
    })
    .when('/treats', {
      templateUrl: '/treats/treats.html',
      controller: 'TreatCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  })

  .controller('MainCtrl', function($scope, GlobalHelper){
    $scope.isLoggedIn = function() {
      return !!GlobalHelper.currentUser;
    };

    $scope.getCurrentUser = function() {
      return GlobalHelper.currentUser;
    }

    $scope.checkCurrentUser = function() {
      console.log('CURRENT USER:', GlobalHelper.currentUser);
    };

    $scope.signOut = function() {
      GlobalHelper.currentUser = null;
      console.log('CURRENT USER:', GlobalHelper.currentUser);
    }
  })

  .controller('AuthCtrl', function($scope, $http, $location, GlobalHelper){
    $scope.userForm = {};

    $scope.handleSignin = function() {
      console.log('CLIENT SIGNIN', $scope.userForm);

      $http.post('/api/sessions', $scope.userForm)
        .success(function(user){
          console.log('USER RETURNED FROM SERVER:', user);
          GlobalHelper.currentUser = user;
          $location.path('/tasks');
        })
        .error(function(data){
          console.log('ERROR:', data);
        })
    };
  })

  .controller('UserCtrl', function($scope, $http, $location, GlobalHelper){
    $scope.currentUser = {};
    $scope.userForm = {};

    $scope.createUser = function() {
      $http.post('/api/users', $scope.userForm)
        .success(function(data) {
          console.log('DATA RETURNED:', data);

          $scope.userForm = {};
          $scope.currentUser = data;

          $location.path('/tasks')
        })
        .error(function(data) {
          console.log('ERROR:' + data);
        });
    };
  })

  .controller('TaskCtrl', function($scope, $http, $location, GlobalHelper){
    $scope.taskForm = {};
    $scope.tasks;

    $scope.getTasks = function() {
      $http.get('/api/tasks')
        .success(function(data){
          console.log('GET TASKS DATA:', data);
          $scope.tasks = data;
        })
        .error(function(err){
          console.log('ERROR:', err);
        })
    }
    $scope.getTasks();

    $scope.createTask = function() {
      $http.post('/api/tasks', $scope.taskForm)
        .success(function(data){
          console.log('CREATE TASK DATA:', data);
          $location.path('/tasks');
        })
        .error(function(err){
          console.log('ERROR:', err);
        })
    }

    $scope.setTaskStatus = function(name, status) {
      console.log('COMPLETE TASK OF:', name);

      $http.post('/api/tasks/edit', {taskName: name, status: status})
        .success(function(data){
          if (status === true) {
            // ADDING REWARD TO USER'S POINTS
            console.log('SHOULD ADD TIX!', data);
            GlobalHelper.currentUser.tixCount += parseInt(data.reward);
            console.log('CURRENT USER TIX:', GlobalHelper.currentUser.tixCount);
          } else {
            // REMOVING REWARD FROM USER'S POINTS
            if (GlobalHelper.currentUser.tixCount < data.reward) {
              GlobalHelper.currentUser.tixCount = 0;
            } else {
              GlobalHelper.currentUser.tixCount -= parseInt(data.reward);
            }

            console.log('CURRENT USER TIX:', GlobalHelper.currentUser.tixCount);
          }

          console.log('EDITED DATA:', data);
          $location.path('/tasks');
        })
        .error(function(err){
          console.log('ERROR:', err);
        })
    };
  })

  .controller('TreatCtrl', function($scope, $http, $location, GlobalHelper){
    $scope.treatForm = {};
    $scope.treats;

    $scope.getTreats = function() {
      $http.get('/api/treats')
        .success(function(data){
          console.log('GET TREATS DATA:', data);
          $scope.treats = data;
        })
        .error(function(err){
          console.log('ERROR:', err);
        })
    }
    $scope.getTreats();

    $scope.createTreat = function() {
      $http.post('/api/treats', $scope.treatForm)
        .success(function(data){
          console.log('CREATED TREAT:', data);
          $location.path('/treats');
        })
        .error(function(err){
          console.log('ERROR:', err);
        })
    }

    $scope.checkCredit = function(name, status, price) {
      if (GlobalHelper.currentUser.tixCount >= price) {
        console.log('HAS ENOUGH POINTS');
        $scope.setTreatStatus(name, status);
      } else {
        console.log('CANT AFFORD, DO MORE WORK!');
        $location.path('/tasks');
      }
    }

    $scope.setTreatStatus = function(name, status) {
      console.log('COMPLETE TASK OF:', name);

      $http.post('/api/treats/edit', {name: name, status: status})
        .success(function(data){
          console.log('EDITED DATA:', data);
          $location.path('/treats');
        })
        .error(function(err){
          console.log('ERROR:', err);
        })
    }
  })

  .factory('GlobalHelper', function ($http) {
    var currentUser = null;

    var test = function() {
      console.log('LOGGING FROM MAIN SERVICE');
    }

    return {
      currentUser: currentUser,
      test: test
    };
  })



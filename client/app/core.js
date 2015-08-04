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
    .otherwise({
      redirectTo: '/'
    });
  })

  .controller('MainCtrl', function($scope, GlobalHelper){


    $scope.checkCurrentUser = function() {
      GlobalHelper.test();
      console.log('CURRENT USER:', GlobalHelper.currentUser);
    };
  })

  .controller('AuthCtrl', function($scope, $http, GlobalHelper){
    $scope.userForm = {};

    $scope.handleSignin = function() {
      console.log('CLIENT SIGNIN', $scope.userForm);

      $http.post('/api/sessions', $scope.userForm)
        .success(function(user){
          console.log('USER RETURNED FROM SERVER:', user);
          GlobalHelper.currentUser = user;
        })
        .error(function(data){
          console.log('ERROR:', data);
        })
    };
  })

  .controller('UserCtrl', function($scope, $http, GlobalHelper){
    $scope.currentUser = {};
    $scope.userForm = {};

    $scope.createUser = function() {
      $http.post('/api/users', $scope.userForm)
        .success(function(data) {
          console.log('DATA RETURNED:', data);

          $scope.userForm = {};
          $scope.currentUser = data;
        })
        .error(function(data) {
          console.log('ERROR:' + data);
        });
    };
  })

  .factory('GlobalHelper', function ($http) {
    var currentUser = {};

    var test = function() {
      console.log('LOGGING FROM MAIN SERVICE');
    }

    return {
      currentUser: currentUser,
      test: test
    };
  })



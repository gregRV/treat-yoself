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
  .controller('MainCtrl', function($scope){
    $scope.formData = {};

    $scope.test = function() {
      console.log('TEST');
    };
  })
  .controller('AuthCtrl', function($scope, $http){
    $scope.currentUser = {};
    $scope.userForm = {};

    $scope.handleSignin = function() {
      console.log('CLIENT SIGNIN', $scope.userForm);

      $http.post('/api/sessions', $scope.userForm)
        .success(function(user){
          console.log('USER RETURNED FROM SERVER:', user);
          $scope.currentUser = user;
        })
        .error(function(data){
          console.log('Error:', data);
        })
    };
  })
  .controller('UserCtrl', function($scope, $http){
    $scope.currentUser = {};
    $scope.userForm = {};

    $scope.createUser = function() {
      $http.post('/api/users', $scope.userForm)
        .success(function(data) {
          console.log('data returned:', data);

          $scope.userForm = {};
          $scope.currentUser = data;
        })
        .error(function(data) {
          console.log('Error:' + data);
        });
    };
  })



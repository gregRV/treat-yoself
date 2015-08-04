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
  .controller('MainCtrl', function($scope, $http, $location){
    $scope.formData = {};

    $scope.test = function() {
      console.log('TEST');
    };

    // WORKS, BUT DONT NEED TO FETCH 'TODOS' NOW
    // $http.get('/api/todos')
    //   .success(function(data) {
    //     $scope.todos = data;
    //     console.log(data);
    //   })
    //   .error(function(data) {
    //     console.log('Error: ' + data);
    //   });

    // $scope.createTodo = function() {
    //   $http.post('/api/todos', $scope.formData)
    //     .success(function(data) {
    //       // clear the form so our user is ready to enter another
    //       $scope.formData = {};
    //       $scope.todos = data;
    //       console.log(data);
    //     })
    //     .error(function(data) {
    //       console.log('Error: ' + data);
    //     });
    // };
  })
  .controller('AuthCtrl', function($scope, $http){
    $scope.user = {};

    $scope.createUser = function() {
      console.log('USER in client:', $scope.user);

      $http.post('/api/users', $scope.user)
        .success(function(data) {
          $scope.user = {};
          console.log('data returned:', data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
  })



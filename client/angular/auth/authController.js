angular.module('baseApp.controllers')
  .controller('authController', ['$scope','$http', '$location', 'currentUser', 'ValidatorFactory',
    function ($scope, $http, $location, currentUser, validate) {
      'use strict';

      $scope.user = {};
      $scope.login = function () {
        if (!!$scope.user.password && !!$scope.user.email) {
          $http
            .post('/login', $scope.user )
            .error(function (err) {
              $scope.error = err.message;
            })
            .success(currentUser.login);
        }
      };

      $scope.$watch( function(){ return $scope.user.password; }, function(nw){
        if( typeof nw === 'undefined'){
          validate.confirmPass.pattern = /.+/i;
        }else{
          validate.confirmPass.pattern = new RegExp( '^'+nw+'$');
        }
      });

      $scope.register = function () {
        $scope.submitted = true;

        var validation = {};
        if( validate.forms.register( $scope.user, validation ) ){
          $scope.validationErrors = validation.errors;
          return;
        }else {

        }

        $http
          .post('/join', $scope.user )
          .error(function (err) {
            $scope.error = err.message;
          })
          .success(currentUser.login);

      };
    }
  ]);

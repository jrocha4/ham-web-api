angular.module('baseApp.services')
  .factory('currentUser', ['$location', '$http', '$rootScope', function ($location, $http, $rootScope) {
    'use strict';

    var currentUser;

    function login (user) {
      currentUser = user;
      $rootScope.$emit('userLoggedIn');
      $location.path('/');
    }

    if( ['/login','/register','/recover'].indexOf( $location.path() ) === -1 ){
      $http
        .get('/session', {})
        .error(function () {
          console.log('user not authenticated');
          $location.path('/login');
        })
        .success(login);
    }

    return {
      get: function () {
        return currentUser;
      },
      login: login
    };
  }]);

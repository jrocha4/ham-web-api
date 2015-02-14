angular.module('baseApp.services')
  .factory('currentUser', ['$state', '$location', '$http', '$rootScope', function ($state, $location, $http, $rootScope) {
    'use strict';

    var currentUser;

    function login (user) {
      currentUser = user;
      $rootScope.$emit('userLoggedIn');
      $state.transitionTo('home');
      //$location.path('/');
    }

    if( ['/login','/register','/recover'].indexOf( $location.path() ) === -1 ){
      $http
        .get('/session', {})
        .error(function () {
          console.log('user not authenticated');
          $state.transitionTo('login');
          //$location.path('/login');
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

/*
  TODO: example here
 */

angular.module('baseApp', [
  'ngRoute',
  'angular-loading-bar',
  'baseApp.services',
  'baseApp.directives',
  'baseApp.controllers'
]);

angular.module('baseApp').config(function ($routeProvider, $locationProvider) {
  'use strict';

  $locationProvider
      .html5Mode(false);

  $routeProvider
      .when('/login', {
        templateUrl: '/assets/html/auth/login'
      })
      .when('/register',    {
        templateUrl: '/assets/html/auth/register'
      })
      .when('/recover',    {
        templateUrl: '/assets/html/auth/recover'
      })
      .when('/', {
        templateUrl: '/assets/html/landingPages/dashboard',
        controller: null
      })
      .otherwise({redirectTo: '/'});
});

angular.module('baseApp.services', ['ngResource']);
angular.module('baseApp.directives', []);
angular.module('baseApp.controllers', [])
  .run(['$rootScope', 'LocaleFactory', 'ValidatorFactory', 'currentUser',
    function ($rootScope, LocaleFactory, ValidatorFactory) {
      'use strict';

      $rootScope.locale = LocaleFactory.getEnglish();
      $rootScope.validate = ValidatorFactory;

      $rootScope.$on('$routeChangeSuccess', function(){
        //window.ga('send', 'pageview', $location.path());
      });
    }
  ]);


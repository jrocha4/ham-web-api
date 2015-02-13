angular.module('baseApp.services')
  .factory('ValidatorFactory', [ function() {
    'use strict';

    return {
      email: {
        pattern: /^\S+@\S+\.\S+$/i,
        message: 'Email invalid'
      },
      confirmPass: {
        pattern: /123/i,
        message: 'Confirmation Invalid'
      },
      forms: {
        register: function( user, validation ){
          switch( true ){
            case !angular.isDefined( user.email ) || !angular.isDefined( user.password ):
            case user.password !== user.confirmPassword:
              validation.errors = ['Unable to register'];
              return true;
            default:

              return false;
          }
        }
      }
    };
  }]);
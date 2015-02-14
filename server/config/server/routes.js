'use strict';

var getData = require('request');

module.exports = function (config, server) {

  function getNavigation( ){
    var defer = require('q').defer();
    getData({
      url: config.cmsURL + '/taxonomies',
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        return defer.resolve( body.nodes );
      }else{
        return defer.reject( [] );
      }
    });
    return defer.promise;
  }

  server.utils = {
    getNav: getNavigation
  };
  server.lang = config.lang.get();

  require('../../controllers/auth.js')(server);

  require('../../controllers/knowledge.js')(config, server);

  server.route({
    method: 'GET',
    path: '/assets/{param*}',
    handler: {
      directory: {
        path: '../public',
        defaultExtension: 'html'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: {
      file: 'img/favicon.ico'
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply){

      getNavigation()
        .then( function(nav){
          reply.view('_index', {
            navigation: nav,
            lang: server.lang
          });
        });
    }
  });

  server.route({
    method: 'GET',
    path: '/app',
    handler: function(request, reply){
      getNavigation()
          .then( function(nav){
            reply.view('_app', {
              navigation: nav,
              lang: server.lang
            });
          });
    }
  });

  return server;
};

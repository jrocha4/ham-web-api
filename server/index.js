'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'development') {
  require('node-env-file')('.env');
}

var config = require('./config/environments/variables')[process.env.NODE_ENV],
    server = require('./config/server/hapi.js')(config);

// setup datastore
require('./config/storage/mongoose.js')(config);

// setup routes
require('./config/server/routes.js')(config, server);

// don't start server when testing
if (!module.parent) {
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });
}

module.exports = server;

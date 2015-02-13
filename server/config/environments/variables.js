'use strict';

var Path = require('path'),
    rootPath = Path.normalize(__dirname + '/../../'),
    language = require('./../languages');

module.exports = {
  development: {
    datastoreURI: 'mongodb://localhost/development',
    cmsURL: "http://cms-dev.jesusrocha.info",
    rootPath: rootPath,
    port: 8042,
    lang: language
  },
  test: {
    datastoreURI: 'mongodb://localhost/testing',
    cmsURL: "http://cms-dev.jesusrocha.info",
    rootPath: rootPath,
    port: 8043,
    lang: language
  },

  stage: {
    datastoreURI: 'mongodb://localhost/staging',
    cmsURL: "http://cms-stage.jesusrocha.info",
    rootPath: rootPath,
    port: 8041,
    lang: language
  },

  production: {
    datastoreURI: 'mongodb://localhost/production',
    cmsURL: "http://cms.jesusrocha.info",
    rootPath: rootPath,
    port: 8040,
    lang: language
  }
};

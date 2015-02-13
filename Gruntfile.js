'use strict';

module.exports = function (grunt) {
  
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js',
        'client/**/*.js',
        'server/**/*.js',
        'test/**/*.js',
        '!server/public/**/*.js'
      ]
    },

    less: {
      development: {
        options: {
          compress: true  //minifying the result
        },
        files: {
          'server/public/css/application.css' : 'client/styles/application.less'
        }
      }
    },

    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [{
          cwd: 'client/angular/',
          src: ['**/*.jade', '!**/_*.jade'],
          dest: 'server/public/html',
          expand: true,
          ext: '.html'
        }]
      }
    },

    concat: {
      options: {
        separator: '\n'
      },
      angular: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-cookies/angular-cookies.js',
          'bower_components/angular-sanitize/angular-sanitize.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-loading-bar/build/loading-bar.js'
        ],
        dest: 'server/public/js/angular.js'
      },
        utils: {
            src: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/bootstrap/dist/js/bootstrap.js'
            ],
            dest: 'server/public/js/utils.js'
        },
      application: {
        src: ['server/public/js/angular.js', 'server/public/js/utils.js', 'client/application.js', 'client/**/*.js'],
        dest: 'server/public/js/application.js'
      }
    },

    karma: {
      once: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      watch: {
        configFile: 'test/karma.conf.js'
      }
    },

    exec: {
      npmTest: 'npm test'
    },

    copy: {
      build: {
        cwd: 'bower_components/fontawesome/fonts',
        src: [ '**' ],
        dest: 'server/public/fonts',
        expand: true
      },
      jade: {
        cwd: 'client/views',
        src: ['**/_*.jade'],
        dest: 'server/views',
        expand: true
      }
    },

    watch: {
      less: {
        files: ['client/styles/**/*.less'],
        tasks: ['less']
      },
      angular: {
        files: ['client/angular/**/*.jade', '!**/_*.jade'],
        tasks: ['jade']
      },
      jade: {
        files: ['!**/_*.jade'],
        tasks: ['copy:jade']
      },
      scripts: {
        files: [
          '*.js',
          'server/**/*.js',
          '!server/public/**/*.js',
          'client/**/*.js',
          'test/**/*.js'
        ],
        tasks: ['jshint:all', 'concat']
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['less', 'jade', 'concat', 'copy']);
};

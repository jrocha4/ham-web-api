# Hapi/AngularJS/MongoDB (HAM)
## Setup MongoDB
### Check if Installed

    $: mongod --version

### Platform Installation

    Ubuntu: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
    OS X: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

### Have Mongo Running Before This Application

    mongod --config mongoDB/config/mongod.conf

## Setup NodeJS & NPM
### Check if Installed

    $: node -v
    $: npm -v

### Platform Installation

    Node (All Platforms): http://nodejs.org/download/
    NPM is included in all platforms of Node

## Hapi-AngularJS-MongoDB App
### Setup

    npm install supervisor grunt bower -g
    npm install
    bower install
    grunt build

### Run Application

    supervisor server/index.js (can auto-package/reload modified .js')
    -or-
    node server/index.js (can be setup to debuggable through WebStorm)

### Run linters, tests, and watch

    grunt

    grunt karma
    npm test

## References
### Hapi [http://hapijs.com]
### AngularJS [https://angularjs.org]
### MongoDB [http://www.mongodb.org]

### Utilities
#### Back-End

    Jade [http://jade-lang.com]

#### Front-End

    Bootstrap 3.3.2 [http://getbootstrap.com]
    Font-Awesome 4.2.0 [http://fortawesome.github.io/Font-Awesome]
    jQuery 2.1.1 [http://jquery.com]

'use strict';

var englishLanguage = {
  buttons: {
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    login: 'Login',
    register: 'Register'
  },
  components: {
    callToAction: {
      header: 'Reliable, Simple and Secure Platform',
      body: 'Sandboxing UDID content management system ruby on rails continuous deployment big data infographic. '+
      'Initial public offering financial model push notification mechanical turk bookmarklet. Term sheet convertible'+
      'note colluding bootstrapping.',
      formTitle: 'Get 1 Month FREE Trial Now'
    }
  },
  forms: {
    labels: {
      name: 'Name',
      email: 'Email',
      message: 'Message'
    }
  },
  sr: {
    toggleNavigation: 'Toggle navigation'
  }
};

englishLanguage.components.navigation = {
  title: 'WebTech',
  domains: {
    title: 'Domains',
    moreToCome: 'More to Come!'
  },
  login: englishLanguage.buttons.login,
  register: englishLanguage.buttons.register,
  logout: 'Logout',
  myAccount: 'My Account'
};


module.exports = function(){
  return {
    name: 'english',
    lang: englishLanguage
  };
};
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','angularSpinners','uiGmapgoogle-maps','ui.bootstrap', 'starter.controllers', 'starter.services', 'ngCookies','ngCordova', 'ngSanitize', 'LocalStorageModule'])

.run(function($ionicPlatform, $rootScope,$state,localStorageService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $rootScope.$on('$stateChangeStart', function(event, tostate, toparams){
      if (tostate.url === '/login' || tostate.url === '/register')
      {
        if(tostate.url === '/login' && localStorageService.get("userId") !== undefined)
          $state.go('dash');
      
      }
      else if(tostate.data.requireLogin === true && localStorageService.get("userId") === undefined){
          event.preventDefault();
          $state.go('login');
        }
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

.state('user', {
    url: '/user/:id',
        templateUrl: 'templates/user.html',
        controller: 'UserCtrl',
      data: {
        requireLogin: true
      }
  })
.state('codes',{
  url: '/codes/:id',
  templateUrl: 'templates/codes.html',
  controller: 'codesCtrl',
  data: {
    requireLogin: true
  }
})
.state('gifts',{
  url: '/gifts/:id',
  templateUrl: 'templates/gifts.html',
  controller: 'giftsCtrl',
  data: {
    requireLogin: true
  }
})
.state('infos',{
  url: '/infos/:id',
  templateUrl: 'templates/infos.html',
  controller: 'infosCtrl',
  data: {
    requireLogin: true
  }
})
.state('take', {
    url: '/take/:id',
        templateUrl: 'templates/take.html',
        controller: 'takeCtrl',
      data: {
        requireLogin: true
      }
  })
  .state('login', {
   url: '/login',
   templateUrl: 'templates/login.html',
    controller:'LogCtrl',
    data:{
      requireLogin: false
     }
 })
  .state('register', {
   url: '/register',
   templateUrl: 'templates/register.html',
    controller:'registerCtrl',
    data:{
      requireLogin: false
     }
 })
  .state('dash', {
    url: '/dash',
    templateUrl: 'templates/dash.html',
    controller: 'DashCtrl',
       data: {
        requireLogin: true
      }
  })
.state('store', {
      url: '/dash/:id',
      templateUrl: 'templates/store-detail.html',
      controller: 'storeDetailCtrl',
         data: {
        requireLogin: true
      }
    })
  .state('chats', {
      url: '/chats',
      templateUrl: 'templates/tab-chats.html',
      controller: 'ChatsCtrl',
         data: {
        requireLogin: true
      }
    })
    .state('chat-detail', {
      url: '/chats/:id',
      templateUrl: 'templates/chat-detail.html',
      controller: 'ChatDetailCtrl',
         data: {
        requireLogin: true
      }
    })

  .state('account', {
    url: '/account',
    templateUrl: 'templates/tab-account.html',
    controller: 'AccountCtrl',
      data: {
        requireLogin: true
      }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

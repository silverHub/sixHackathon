'use strict';

var ipAddresses = {
  backend: 'http://172.16.54.224​:8080',
  notification: 'http://172.20.10.7:3000'
};


angular.module('clientapp', ['ionic','ngCordova'])
  .value('ips',ipAddresses)

  .factory('AppIdentifier', function AppIdentifier() {
    // get the phone number

    var id = null;

    var phoneNumberMap = {
      216: '+36304244773',
      228: '+41789646592'
    };

    function getId() {
      return id;
    }

    function setId(no) {
      id = phoneNumberMap[no];
    }

    return {
      getId: getId,
      setId: setId
    };
  })

  .run(function($ionicPlatform, AppIdentifier) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)

    
      function successCallback(result) {
        AppIdentifier.setId(result.mcc);
      }

      function errorCallback(error) {
        alert(angular.toJson(error));
      }

      if (window.plugins && window.plugins.sim) {
          window.plugins.sim.getSimInfo(successCallback, errorCallback);
      }

      if (window.cordova && window.cordova.plugins.Keyboard) {
        

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($ionicConfigProvider) {
      $ionicConfigProvider.views.maxCache(5);
      $ionicConfigProvider.backButton.text('Back').icon('ion-chevron-left');
      $ionicConfigProvider.backButton.previousTitleText(false);
    })

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main/base');
    $stateProvider
      // this state is placed in the <ion-nav-view> in the index.html
        .state('main', {
          url: '/main',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
        })
        .state('main.base', {
          url: '/base',
          views: {
            'menuContent': {
              templateUrl: 'templates/base.html',
            }
          }
        })
        .state('main.listDetail', {
          url: '/base/detail',
          params: {bill: null},
          views: {
            'menuContent': {
              templateUrl: 'templates/list-detail.html',
              controller: 'DetailsCtrl'
            }
          }
        })
        .state('main.sharewith', {
          url: '/base/sarewith',
          views: {
            'menuContent': {
              templateUrl: 'templates/shareWith.html',
              controller: 'ShareWithCtrl'
            }
          }
        });
  });

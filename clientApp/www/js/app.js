'use strict';

var ipAddresses = {
  backend: '172.16.54.224​:8080',
  notification: '172.16.49.175:3000'
};


angular.module('clientapp', ['ionic', 'ngCordova', 'clientapp.controllers', 'clientapp.factories'])
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
      $ionicConfigProvider.backButton.text('').icon('ion-ios-arrow-left');
    })

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main/base');
    $stateProvider
      // this state is placed in the <ion-nav-view> in the index.html
        .state('main', {
          url: '/main',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })
        .state('main.base', {
          url: '/base',
          views: {
            'tab-list': {
              templateUrl: 'templates/base.html',
              controller: 'AppCtrl'
            }
          }
        })
        .state('main.listDetail', {
          url: '/base/detail',
          views: {
            'tab-list': {
              templateUrl: 'templates/list-detail.html',
              controller: 'DetailCtrl'
            }
          }
        });
  });

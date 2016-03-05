'use strict';


angular.module('clientapp', ['ionic','ngCordova'])
  .value('ips',{
    backend: 'http://172.27.0.220​:8080',
    notification: 'http://172.27.0.220:3000'
  })

  .factory('AppIdentifier', function AppIdentifier() {
    // get the phone number

    var id = '+41789646592';

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

      if (window.cordova && $cordovaKeyboard) {
        $cordovaKeyboard.hideAccessoryBar(true);
      }
      if (window.StatusBar) {
          StatusBar.styleDefault();
      }

    });
  })

  .config(function($ionicConfigProvider) {
      $ionicConfigProvider.views.maxCache(5);
      $ionicConfigProvider.backButton.text('Back').icon('ion-ios-arrow-left');
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
          params: {bill: null},
          views: {
            'menuContent': {
              templateUrl: 'templates/shareWith.html',
              controller: 'ShareWithCtrl'
            }
          }
        });
  })

  .directive('clickForOptions', ['$ionicGesture', function($ionicGesture) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $ionicGesture.on('tap', function(e){

                // Grab the content
                var content = element[0].querySelector('.item-content');

                // Grab the buttons and their width
                var buttons = element[0].querySelector('.item-options');

                if (!buttons) {
                    console.log('There are no option buttons');
                    return;
                }
                var buttonsWidth = buttons.offsetWidth;

                ionic.requestAnimationFrame(function() {
                    content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                    if (!buttons.classList.contains('invisible')) {
                        console.log('close');
                        content.style[ionic.CSS.TRANSFORM] = '';
                        setTimeout(function() {
                            buttons.classList.add('invisible');
                        }, 250);                
                    } else {
                        buttons.classList.remove('invisible');
                        content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
                    }
                });     

            }, element);
        }
    };
}]);

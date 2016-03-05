'use strict';

angular.module('clientapp')
  .controller('AppCtrl', AppCtrl)
  .controller('DetailsCtrl', DetailsCtrl);

AppCtrl.$inject=['QRFactory','SocketFactory','$ionicPopup','Urls','AppIdentifier','$http','$scope', '$state', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification'];
function AppCtrl(QRFactory, SocketFactory, $ionicPopup, Urls, AppIdentifier, $http, $scope, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification) {

  SocketFactory.on('echo', function(data){
      $scope.notif = data;
  });

  function showBill(isPrimary){
    $scope.invoice.isPrimary = isPrimary;
    $state.go('main.listDetail', {bill: $scope.invoice});
  }

  function processInvoice(invoice) {
        $scope.invoice = invoice.data;

        if(!invoice.data.primaryId) {
          $ionicPopup.show({
              title: 'Do you want to be the master of this invoice?',
              scope: $scope,
              buttons: [
                { text: 'No',
                  type: 'button-assertive',
                  onTap: function(e) {
                    showBill(false);
                  }
                },
                {
                  text: '<b>Yes</b>',
                  type: 'button-success',
                  onTap: function(e) {
                    $http.post(Urls.setBillOwner,{billId: invoice.data.billId, clientId : AppIdentifier.getId()})
                      .then(function(){
                        showBill(true)
                      });
                  }
                }
              ]
          });
        } else {
          showBill(false);
        }
    }

    $scope.getQR = function() {
        QRFactory.getQR()
            .then(processInvoice)
            ['catch'](function(error){
              alert('error'+error);
            });
    };

      $ionicPlatform.ready(function () {

    // ========== Scheduling

    $scope.scheduleSingleNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Szia öcsi',
        text: 'Bill sharing request arrived',
        at: new Date().getTime()
      }).then(function (result) {
        // ...
      });
    };

    $scope.scheduleMultipleNotifications = function () {
      $cordovaLocalNotification.schedule([
        {
          id: 1,
          title: 'Title 1 here',
          text: 'Text 1 here',
          data: {
            customProperty: 'custom 1 value'
          }
        },
        {
          id: 2,
          title: 'Title 2 here',
          text: 'Text 2 here',
          data: {
            customProperty: 'custom 2 value'
          }
        },
        {
          id: 3,
          title: 'Title 3 here',
          text: 'Text 3 here',
          data: {
            customProperty: 'custom 3 value'
          }
        }
      ]).then(function (result) {
        // ...
      });
    };

    $scope.scheduleDelayedNotification = function () {
      var now = new Date().getTime();
      var _1SecondsFromNow = new Date(now + 1 * 1000);

      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        at: _1SecondsFromNow
      }).then(function (result) {
        // ...
      });
    };

    $scope.scheduleEveryMinuteNotification = function () {
      $cordovaLocalNotification.schedule({
        id: 1,
        title: 'Title here',
        text: 'Text here',
        every: 'minute'
      }).then(function (result) {
        // ...
      });
    };

    // =========/ Scheduling

    // ========== Update

    $scope.updateSingleNotification = function () {
      $cordovaLocalNotification.update({
        id: 1,
        title: 'Title - UPDATED',
        text: 'Text - UPDATED'
      }).then(function (result) {
        // ...
      });
    };

    $scope.updateMultipleNotifications = function () {
      $cordovaLocalNotification.update([
        {
          id: 1,
          title: 'Title 1 - UPDATED',
          text: 'Text 1 - UPDATED'
        },
        {
          id: 2,
          title: 'Title 2 - UPDATED',
          text: 'Text 2 - UPDATED'
        },
        {
          id: 3,
          title: 'Title 3 - UPDATED',
          text: 'Text 3 - UPDATED'
        }
      ]).then(function (result) {
        // ...
      });
    };

    // =========/ Update

    // ========== Cancelation

    $scope.cancelSingleNotification = function () {
      $cordovaLocalNotification.cancel(1).then(function (result) {
        // ...
      });
    };

    $scope.cancelMultipleNotifications = function () {
      $cordovaLocalNotification.cancel([1, 2]).then(function (result) {
        // ...
      });
    };

    $scope.cancelAllNotifications = function () {
      $cordovaLocalNotification.cancelAll().then(function (result) {
        // ...
      });
    };

    // =========/ Cancelation

    // ========== Events

    $rootScope.$on('$cordovaLocalNotification:schedule',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:trigger',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:update',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:clear',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:clearall',
    function (event, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:cancel',
    function (event, notification, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:cancelall',
    function (event, state) {
      // ...
    });

    $rootScope.$on('$cordovaLocalNotification:click',
    function (event, notification, state) {
      // ...
    });

    // =========/ Events

  });


}

DetailsCtrl.$inject=['$stateParams','$scope','$ionicModal'];
function DetailsCtrl($stateParams, $scope, $ionicModal) {
  $scope.invoice = $stateParams.bill;
  $scope.consumption = [];

  $ionicModal.fromTemplateUrl('templates/consumptionModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

$scope.reset = function reset() {
  $scope.consumption = [];
}
$scope.openModal = function openModal(e) {
  $scope.modal.show(e);
}
$scope.pay = function pay() {
  console.log('pay');
}
$scope.closeModal = function() {
  $scope.modal.hide();
}
$scope.addToConsumption = function addToConsumption(item) {
  $scope.consumption.push(item.name);
}

}

'use strict';

angular.module('clientapp')
  .controller('AppCtrl', AppCtrl)
  .controller('DetailsCtrl', DetailsCtrl)
  .controller('ShareWithCtrl', ShareWithCtrl);

AppCtrl.$inject=['QRFactory','SocketFactory','$ionicPopup','Urls','AppIdentifier','$http','$scope', '$state', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification', '$ionicSideMenuDelegate'];
function AppCtrl(QRFactory, SocketFactory, $ionicPopup, Urls, AppIdentifier, $http, $scope, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification, $ionicSideMenuDelegate) {

  SocketFactory.on('echo', function(data){
      $scope.notif = data;
  });

  function showBill(isPrimary){
    if($ionicSideMenuDelegate.isOpen()) {
      $ionicSideMenuDelegate.toggleRight();
    }
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
                  type: 'button-balanced',
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

}

DetailsCtrl.$inject=['$state','$stateParams','$scope'];
function DetailsCtrl($state, $stateParams, $scope) {
  $scope.invoice = $stateParams.bill;

  $scope.shareIt = function() {
    $state.go('main.sharewith');
  };

}

ShareWithCtrl.$inject=['$scope','$timeout'];
function ShareWithCtrl($scope, $timeout) {
  // Magic happens here but now its just mock
  var i=0;
  var users = [
    {
     id: '+41791234567',
     name: 'Karoly Norris',
     image: 'img/karoly.png'   
    },{
      id: '+41782345678',
      name: 'Tamas Stallone',
      image: 'img/tamas.png'
    },{
      id: '+41763456789',
      name: 'Krisztian Schwarzenegger',
      image: 'img/krisztian.png'
    }
  ];  

  var timeout = [1500, 2500,1000];

  $scope.users = [];
  $scope.loadingStart = true;

  function getUser(user) {
    $timeout(function(){
      $scope.users.push(users[user]);
      i++;
      if(i<3) {
        getUser(i);
      } else {
        $scope.loadingStart = false;
      }
    },timeout[i]);
  }
  getUser(i);

}

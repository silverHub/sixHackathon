'use strict';

angular.module('clientapp')
  .controller('AppCtrl', AppCtrl)
  .controller('HomeCtrl', HomeCtrl)
  .controller('DetailsCtrl', DetailsCtrl)
  .controller('ShareWithCtrl', ShareWithCtrl);

HomeCtrl.$inject=['$scope','$interval'];
function HomeCtrl($scope, $interval) {

  $interval(function(){
    $scope.isBlinkerVisible = !$scope.isBlinkerVisible;
  },400);

}

AppCtrl.$inject=['$cordovaDialogs', 'QRFactory','SocketFactory','Urls','AppIdentifier','$http','$scope', '$state', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification', '$ionicSideMenuDelegate'];
function AppCtrl($cordovaDialogs, QRFactory, SocketFactory, Urls, AppIdentifier, $http, $scope, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification, $ionicSideMenuDelegate) {

  $scope.paymit = '<img class="title-image" src="img/paymit-logo_sm.png" style="margin: 9px 0 0 15px;"/>';

  SocketFactory.on('sendBill', function(data){
      $state.go('main.listDetail', {bill: data});
  });

  $scope.shareIt = function() {
    $state.go('main.sharewith',{bill: $scope.invoice});
  };

  function showBill(isPrimary){
    if($ionicSideMenuDelegate.isOpen()) {
      $ionicSideMenuDelegate.toggleRight();
    }
    $rootScope.listscreen = isPrimary;
    $scope.invoice.isPrimary = isPrimary;
    $state.go('main.listDetail', {bill: $scope.invoice});
  }

  function processInvoice(invoice) {
        $scope.invoice = invoice.data;
        console.log(AppIdentifier.getId());
        if(!invoice.data.primaryId) {

          $cordovaDialogs.confirm('', 'Do you want to be the owner of this invoice?', ['Yes','No'])
            .then(function(index) {
              // no button = 0, 'OK' = 1, 'Cancel' = 2
              if (index===1) {
                $http.post(Urls.setBillOwner,{billId: invoice.data.bill.billId, clientId : AppIdentifier.getId()})
                   .then(function(){
                      showBill(true);
                   });
              } else {
                showBill(false);
              }
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


DetailsCtrl.$inject=['$state', '$stateParams','$scope','$ionicModal', '$rootScope','SocketFactory'];
function DetailsCtrl($state, $stateParams, $scope, $ionicModal, $rootScope,SocketFactory) {

  $rootScope.homescreen = false;

  $scope.invoice = $stateParams.bill;
  Array.prototype.contains = function findById(itemToFind) {
    var ids = this.map(function(item) {
      return item.itemId;
    });
    if(ids.indexOf(itemToFind.itemId) > -1){
      return this[ids.indexOf(itemToFind.itemId)];
    } else {
      return null;
    }
  }
  $scope.consumption = [];

  $scope.toggleDetails = function(item) {
    item.opened = !item.opened; 
  };

  $ionicModal.fromTemplateUrl('templates/consumptionModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.shareIt = function() {
    $state.go('main.sharewith',{bill: $scope.invoice});
  };

  $scope.reset = function reset() {
    console.log('reset');
    $scope.consumption = [];
  }
  $scope.openModal = function openModal() {
    $scope.modal.show();
  }
  $scope.pay = function pay() {
    // var data = {
    //   billId: ,
    //   clientId:
    // };
    // {"billId":"123456789",
    //  "clientId":"123456789",
    //  "items":[{"itemId":"123456789-2", "quantity":2}, {"itemId":"123456789-3", "quantity":100}]}
    SocketFactory.emit('payItems');
  }
  $scope.closeModal = function closeModal() {
    $scope.modal.hide();
  }
  $scope.decrease = function decrease(consumedItem, index) {

    var match = $scope.invoice.bill.billItems.contains(consumedItem);
    match.quantity++;
    if (consumedItem.quantity > 1) {
      consumedItem.quantity--;
    } else {
      $scope.consumption.splice(index,1);
      console.log($scope.consumption, index);
    }
  }

  $scope.$on('$destroy', function() {
   $scope.modal.remove();
  });

  $scope.addToConsumption = function addToConsumption(item) {
    if(item.quantity > 0){
      var match = $scope.consumption.contains(item);
      item.quantity--;
      if(match){
        match.quantity++;
      } else {
        var consumedItem = JSON.parse(JSON.stringify(item));
        consumedItem.quantity = 1;
        $scope.consumption.push(consumedItem);
      }
  }
    console.log($scope.consumption);
  }
}

ShareWithCtrl.$inject=['Urls','SocketFactory','$scope','$timeout', '$stateParams','$rootScope'];
function ShareWithCtrl(Urls, SocketFactory, $scope, $timeout, $stateParams, $rootScope) {

  $rootScope.homescreen = false;
  $rootScope.listscreen = false;


  // Magic happens here but now its just mock
  $scope.navTitle='<img class="title-image" src="img/shareit_sm.png" style="margin-top: 7px;"/>';
  $scope.invoice = $stateParams.bill;
  $scope.shareWith = function(id) {
    console.log($stateParams.bill);
    SocketFactory.emit('shareBillWithUser', $scope.invoice.bill.billId, function(){
      showBill(true)
    });
  };

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

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

  

  SocketFactory.on('sendBill', function(bill){
      if(bill.clientId === AppIdentifier.getId()){
        $state.go('main.listDetail', {bill: bill});
        console.log(bill);
        SocketFactory.on('payItems', function(payedItems){
          console.log(payedItems);
          payedItems.items.map(function(item) {
            var billItem = bill.contains(item);
            billItem.quantity -= item.quantity;
          });
        });
        SocketListeners.payItemsListener(bill);
      }

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


DetailsCtrl.$inject=['$state', '$stateParams','$scope','$ionicModal','SocketFactory','AppIdentifier'];
function DetailsCtrl($state, $stateParams, $scope, $ionicModal,SocketFactory,AppIdentifier) {

  $scope.invoice = $stateParams.bill;
  console.log($scope.invoice);
  // $scope.invoice.billItems[0].billPayments = [
  //   {
  //     "clientId": "+36304244773",
  //     "quantity": 1
  //   }
  // ];

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


  $scope.shareIt = function() {
    $state.go('main.sharewith',{bill: $scope.invoice});
  };

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
  }

// MODAL

  $ionicModal.fromTemplateUrl('templates/consumptionModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function openModal() {
    $scope.modal.show();
  }
  $scope.pay = function pay() {
    var data = {
      billId: $scope.invoice.bill.billId,
      clientId: AppIdentifier.getId(),
      items: $scope.consumption.map(function(item) {
         return {itemId : item.itemId, quantity : item.quantity};
      })
    };
    SocketFactory.emit('payItems',data);
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
    }
  }

  $scope.$on('$destroy', function() {
   $scope.modal.remove();
  });

  
}

ShareWithCtrl.$inject=['SocketListeners','Urls','SocketFactory','$scope','$timeout', '$stateParams','$rootScope','AppIdentifier'];
function ShareWithCtrl(SocketListeners, Urls, SocketFactory, $scope, $timeout, $stateParams, $rootScope, AppIdentifier) {

  $rootScope.homescreen = false;
  $rootScope.listscreen = false;


  // Magic happens here but now its just mock
  $scope.navTitle='<img class="title-image" src="img/shareit_sm.png" style="margin-top: 7px;"/>';
  $scope.invoice = $stateParams.bill;

  $scope.shareWith = function(id) {
      SocketFactory.emit('shareBillWithUser',{billId: $scope.invoice.bill.billId, clientId: id} , function(){
        console.log(id);
        //TODO: why not runs here
      });
      SocketListeners.payItemsListener($scope.invoice.bill);
  };

  var i=0;
  var users = [
    {
     id: '+36304244773',
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

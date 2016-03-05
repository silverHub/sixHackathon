'use strict';

angular.module('clientapp')
  .controller('AppCtrl', AppCtrl)
  .controller('DetailsCtrl', DetailsCtrl)
  .controller('ShareWithCtrl', ShareWithCtrl);

AppCtrl.$inject=['$cordovaDialogs', 'QRFactory','SocketFactory','Urls','AppIdentifier','$http','$scope', '$state', '$rootScope', '$ionicPlatform', '$cordovaLocalNotification', '$ionicSideMenuDelegate'];
function AppCtrl($cordovaDialogs, QRFactory, SocketFactory, Urls, AppIdentifier, $http, $scope, $state, $rootScope, $ionicPlatform, $cordovaLocalNotification, $ionicSideMenuDelegate) {

  $scope.paymit = '<img class="title-image" src="img/paymit-logo_sm.png" style="margin: 9px 0 0 15px;"/>';


  SocketFactory.on('sendBill', function(data){
      $state.go('main.listDetail', {bill: data});
  });



  function showBill(isPrimary){
    console.log($scope.invoice);
    if($ionicSideMenuDelegate.isOpen()) {
      $ionicSideMenuDelegate.toggleRight();
    }
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


DetailsCtrl.$inject=['$state', '$stateParams','$scope','$ionicModal'];
function DetailsCtrl($state, $stateParams, $scope, $ionicModal) {
  $scope.invoice = $stateParams.bill;
  $scope.consumption = [];
  $scope.consumption.contains = function contains(itemToFind) {
    var ids = this.map(function(item) {
      return item.id;
    });
    if(ids.indexOf(itemToFind.id) > -1){
      return ids[ids.indexOf(itemToFind.id)];
    } else {
      return null;
    }
  }

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
    console.log('pay');
  }
  $scope.closeModal = function() {
    $scope.modal.hide();
  }

  $scope.$on('$destroy', function() {
   $scope.modal.remove();
 });

  $scope.addToConsumption = function addToConsumption(item) {
    console.log(item);
    if($scope.consumption.contains(item)){
      var item = $scope.consumption.contains(item);
      item.quantity++;
    } else {
      $scope.consumption.push(item);
    }
  }
}

ShareWithCtrl.$inject=['Urls','SocketFactory','$scope','$timeout', '$stateParams'];
function ShareWithCtrl(Urls, SocketFactory, $scope, $timeout, $stateParams) {
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

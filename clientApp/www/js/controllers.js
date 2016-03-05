'use strict';

angular.module('clientapp.controllers', [])
  .controller('AppCtrl', AppCtrl);

AppCtrl.$inject=['$scope', 'QRFactory', '$ionicPopup'];
function AppCtrl($scope, QRFactory, $ionicPopup) {

  
  $scope.invoice2 = 'aaa123132';

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
                    alert('dontSetPrimary');
                  }
                },
                {
                  text: '<b>Yes</b>',
                  type: 'button-positive',
                  onTap: function(e) {
                    alert('setPrimary');
                  }
                }
              ]
          });
        } else {
          alert('show bill');
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
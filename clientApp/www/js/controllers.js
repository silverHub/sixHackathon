'use strict';

angular.module('clientapp.controllers', [])
  .controller('AppCtrl', AppCtrl);

AppCtrl.$inject=['$scope', 'QRFactory', '$ionicModal'];
function AppCtrl($scope, QRFactory, $ionicModal) {

  
  $scope.invoice2 = 'aaa123132';

  function processInvoice(invoice) {
        $scope.invoice2 = invoice+'234234';
        $scope.invoice = invoice;
        if(!invoice.primaryId) {
          $ionicModal.fromTemplateUrl('templates/setmaster.html', {scope: $scope})
              .then(function(modal) {
                  $scope.modal = modal;
                  $scope.modal.show();
                });
              // TODO: if accepted the primary: set primary Krisznek -> send id 
              // TODO: 
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

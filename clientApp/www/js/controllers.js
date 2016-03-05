'use strict';

angular.module('clientapp.controllers', [])
  .controller('AppCtrl', AppCtrl);

AppCtrl.$inject=['$scope', 'QRFactory', '$ionicModal'];
function AppCtrl($scope, QRFactory, $ionicModal) {

  function processInvoice(invoice) {
        $scope.invoice = invoice;
        if(!invoice.primaryId) {
          $ionicModal.fromTemplateUrl('templates/setmaster.html', {scope: $scope})
              .then(function(modal) {
                  $scope.modal = modal;
                  $scope.modal.show();
                });
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

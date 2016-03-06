'use strict';

angular.module('clientapp')
  .factory('SocketFactory', SocketFactory)
  .factory('SocketListeners', SocketListeners)
  .factory('QRFactory', QRFactory)
  .factory('Urls', Urls);


Urls.$inject=['ips'];
function Urls(ips) {
  return {
    billUrl : ips.notification+'/getBill',
    setBillOwner: ips.notification+'/setBillOwner'
  };
}

SocketListeners.$inject=['SocketFactory','QRFactory','$rootScope'];
function SocketListeners(SocketFactory, QRFactory, $rootScope) {

    var consumedQty = [0,0,0];

    return {
      payItemsListener: payItemsListener,
      setConsumedQty: setConsumedQty,
      consumedQty: consumedQty
    };

    function payItemsListener() {
      SocketFactory.on('payItems', function(payedItems){

          QRFactory.getBillData(payedItems.billId).then(function(data){
            $rootScope.renewState(data);
          })
      });
    }

    function setConsumedQty(bill){
      console.log('bef',consumedQty);
      bill.billItems.forEach(function(item,index){
        var qty = 0;
        item.billPayments.forEach(function(i){
            qty += i.quantity;
        });
        consumedQty[index] = qty;
      });
      console.log('aft',consumedQty);
    }
}

SocketFactory.$inject=['$log','ips','$rootScope'];
function SocketFactory($log,ips,$rootScope) {

  var socket = io.connect(ips.notification);
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };

}


QRFactory.$inject=['$cordovaBarcodeScanner', '$log', '$http', 'ips', '$q','Urls'];
function QRFactory($cordovaBarcodeScanner, $log, $http, ips, $q, Urls) {
    function getBillData(input) {

        var defer = $q.defer();

        $http.get(Urls.billUrl+'/'+input)
          .then(function(response){
              defer.resolve(response);
          })
          .catch(function(err){
            defer.reject(err);
          });

        return defer.promise;
    }

    function getQR(){
      //return getBillData('261616136624');

       return $cordovaBarcodeScanner.scan()
            .then(function(qrdata) {
              return getProviderData(qrdata.text);
            })
            .catch(function(err){

            });
    }

  return {
    getQR: getQR,
    getBillData: getBillData
  }
}

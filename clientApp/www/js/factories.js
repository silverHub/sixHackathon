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

    var consumedQty = [];

    return {
      payItemsListener: payItemsListener,
      setConsumedQty: setConsumedQty,
      consumedQty: consumedQty
    };

    function payItemsListener() {
      SocketFactory.on('payItems', function(payedItems){
          // console.log(bill);
          // payedItems.items.map(function(item) {
          //   var billItem = bill.billItems.contains(item);
          //   billItem.quantity -= item.quantity;
          // });
          QRFactory.getBillData(payedItems.billId).then(function(data){
            setConsumedQty(data.data.bill);
            $rootScope.renewState(data);
          })
      });
    }

    function setConsumedQty(bill){
      bill.billItems.forEach(function(item){
        var qty = 0;
        item.billPayments.forEach(function(i){
            qty += i.quantity;
        });
        consumedQty.push(qty);
      });
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

        //$http.get('http://'+ips.backend+'/backend/getProviderInfo.json?providerId='+input)
        // TODO add the mock json here
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
      return getBillData('261616136624');

      //  return $cordovaBarcodeScanner.scan()
    //         .then(function(qrdata) {
    //           return getProviderData(qrdata.text);
    //         })
    //         .catch(function(err){

    //         });
    }

  return {
    getQR: getQR,
    getBillData: getBillData
  }
}

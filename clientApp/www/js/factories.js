'use strict';

angular.module('clientapp.factories', [])
    .factory('Socket', SocketFactory)
    .factory('QRFactory', QRFactory)
    .factory('Urls', Urls)
	.factory('AppIdentifier',AppIdentifier);


Urls.$inject=[];
function Urls() {
  return {
    billUrl : 'mocks/getBillDetails.json',
    setBillOwner: '/setBillOwner.json'
  };
}

AppIdentifier.$inject=[];
function AppIdentifier() {
	// get the phone number

	var id = '+41789646592';

	function getId() {
		return id;
	}

	function setId(no) {
		id = no;
	}

	return {
		getId: getId,
		setId: setId
	};
}


SocketFactory.$inject=['$log'];
function SocketFactory($log) {

  var socket = io.connect();
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
    function getProviderData(input) {

        var defer = $q.defer();

        //$http.get('http://'+ips.backend+'/backend/getProviderInfo.json?providerId='+input)
        // TODO add the mock json here
        $http.get(Urls.billUrl)
          .then(function(response){
              defer.resolve(response);
          })
          .catch(function(err){
            defer.reject(err);
          });

        return defer.promise;
    }

    function getQR(){
        return $cordovaBarcodeScanner.scan()
            .then(function(qrdata) {
              return getProviderData(qrdata.text);
            })
            .catch(function(err){

            });
    }

  return {
    getProviderData:getProviderData,
    getQR: getQR
  }
}

(function () {

	// Factory to connect, emit and listen the socket events from socket.io
	angular
		.module('JRDApp')
		.factory('socketFactory', ['$rootScope', function($rootScope) {
			
			var socket;
			return {
				connect: function(){
					socket = io();
				},

				on: function(eventName, callback){
				  	socket.on(eventName, callback);
				},

				emit: function(eventName, data) {
				  	socket.emit(eventName, data);
				}
			};
	}]);

})();	
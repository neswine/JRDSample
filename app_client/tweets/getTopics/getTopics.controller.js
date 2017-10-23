(function () {

	angular
		.module('JRDApp')
		.controller('getTopicsCtrl', [ '$location', '$scope', '$http', function($location, $scope, $http) {

			$http.post('/api/loadTopics').then(function(data){
				$scope.trends = data.data;
			}, function(err){
				$scope.trends = [];
			});

			$scope.goToTweets = function(trend) {
				$location.path("/getUpdates/"+encodeURI(trend.name))
			}

		} 
	]);

})();
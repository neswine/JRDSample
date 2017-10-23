(function () {

    angular.module('JRDApp', ['ngRoute']);

    function config ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/tweets/getTopics/getTopics.view.html',
                controller: 'getTopicsCtrl',
                controllerAs: 'vm'
            })
            .when('/getUpdates/:name', {
                templateUrl: '/tweets/getUpdates/getUpdates.view.html',
                controller: 'getUpdatesCtrl',
                controllerAs: 'vm'
            })
            .when('/getTopics', {
                templateUrl: '/tweets/getTopics/getTopics.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

    angular
        .module('JRDApp')
        .config(['$routeProvider', '$locationProvider', config])

})();
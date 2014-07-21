/*global define */
define(['angular', 'app'], function(angular, app) {
    'use strict';
    return app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/mineSweeperBoard', {
            templateUrl: 'views/mineSweeperBoard.html'
        });
    }]);
});
/*global define*/
define([], function() {
    'use strict';
    return ['$scope', function($scope) {
        $scope.templateUri = 'views/mineSweeperBoard.html';
        $scope.title = 'Mine Sweeper Board';
        $scope.$apply();
    }];
});
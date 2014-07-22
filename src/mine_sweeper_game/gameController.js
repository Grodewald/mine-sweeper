/*global define*/
define([], function() {
    'use strict';
    return ['$scope', '$rootScope', function($scope, $rootScope) {
        var easyGame, selectGame;

        easyGame = { name: 'EasyGame', width : 6, height : 6, bombs : 5 };
        selectGame = function (game) {
            $rootScope.$broadcast('gameRequested', game);
        };

        $scope.selectGame = function () { return selectGame(easyGame); };
        $scope.title = 'Select Game';
        $scope.templateUri = 'views/gameController.html';
        $scope.$apply();
    }];
});
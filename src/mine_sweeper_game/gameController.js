/*global define*/
define(['mine_sweeper_game/gameEvents', 'globalEvents'], 
    function(gameEvents, globalEvents) {

    'use strict';
    return ['$scope', '$rootScope', function($scope, $rootScope) {
        var easyGame, handleLastCellSwept, handleBombSwept, selectGame;

        easyGame = { name: 'EasyGame', width : 6, height : 6, bombs : 5 };

        handleBombSwept = function() {
            $scope.message = "You Lose!";
            $rootScope.$broadcast(gameEvents.gameLost);
        };

        handleLastCellSwept = function () {
            $scope.message = "You Win!";
            $rootScope.$broadcast(gameEvents.gameWon);
        };

        selectGame = function (game) {
            $rootScope.$broadcast(gameEvents.gameRequested, game);
        };
        $scope.$on(globalEvents.boardEvents.lastCellSwept, handleLastCellSwept);
        $scope.$on(globalEvents.boardEvents.bombSwept, handleBombSwept);
        $scope.selectGame = function () { return selectGame(easyGame); };
        $scope.title = 'Select Game';
        $scope.templateUri = 'views/gameController.html';

        $scope.$apply();
    }];
});
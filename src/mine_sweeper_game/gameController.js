/*global define*/
define(['mine_sweeper_game/gameEvents', 'globalEvents'], 
    function(gameEvents, globalEvents) {

    'use strict';
    return ['$scope', '$rootScope', function($scope, $rootScope) {
        var games, handleLastCellSwept, handleBombSwept, 
            selectGame;

        games = [
            {   name : "Easy Game", width : 6, height : 6, bombs : 5,
                description: "Traditional Game 6x6 with 5 bombs" },

            {   name : "Medium Game", width : 8, height : 11, bombs : 10,
                description: "Traditional Game 8x11 with 10 bombs" },

            {   name : "Hard Game", width : 11, height : 14, bombs : 20,
                description: "Traditional Game 11x14 with 5 bombs" },

            {   name : "1-Minute Drill", width : 6, height : 6, bombs : 5, 
                timelimit : 60, 
                description: "The easy game with a 60 second time limit" },

            {   name : "2-minute Drill", width : 8, height : 11, bombs : 10,
                timelimit : 120, 
                description: "The medium game with a 120 second time limit" },

            {   name : "3 Life Hard", width : 11, height : 14, bombs : 20,
                lives : 3,
                description: "The hard game, but you have 3 lives" },

            {   name : "5 Life Mega", width : 16, height : 16, bombs : 50,
                timelimit: 180, lives : 5,
                description: "3 minutes to do a 16x16 with 50 bombs," + 
                " but you have 5 lives" }
        ];

        handleBombSwept = function() {
            $scope.lives = $scope.lives - 1;
            if ($scope.lives === 0) {
                $scope.message = "You Lose!";
                $rootScope.$broadcast(gameEvents.gameLost);
            }
        };

        handleLastCellSwept = function () {
            $scope.message = "You Win!";
            $rootScope.$broadcast(gameEvents.gameWon);
        };

        selectGame = function (game) {
            if (game.lives) {
                $scope.lives = game.lives;
            }
            else {
                $scope.lives = 1;
            }
            $rootScope.$broadcast(gameEvents.gameRequested, 
                game);
        };

        $scope.games = games;
        $scope.selectedGame = $scope.games[2];
        $scope.$on(globalEvents.boardEvents.lastCellSwept, handleLastCellSwept);
        $scope.$on(globalEvents.boardEvents.bombSwept, handleBombSwept);
        $scope.selectGame = selectGame;
        $scope.title = 'Select Game';
        $scope.templateUri = 'views/gameController.html';

        $scope.$apply();
    }];
});
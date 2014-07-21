/*global define, require */
define(['angular'], function (angular) {
    'use strict';
    return angular.module('mineSweeper.controllers', [])
        .controller('mineSweeperBoardController', ['$scope', '$injector', 
            function ($scope, $injector) {
                require(['mine_sweeper_board/mineSweeperBoardController'],
                    function (ctrl) {
                        $injector.invoke(ctrl, this, {'$scope' : $scope});
                    }
                );
            }]
        )
        .controller('gameController', ['$scope', '$injector', '$rootScope', 
            function ($scope, $injector, $rootScope) {
                require(['mine_sweeper_game/gameController'],
                    function (ctrl) {
                        $injector.invoke(ctrl, this, { '$scope' : $scope,
                        '$rootScope' : $rootScope});
                    }
                );
            }]
        );
});
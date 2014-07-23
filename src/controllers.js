/*global define, require */
define(['angular'], function (angular) {
    'use strict';
    return angular.module('mineSweeper.controllers', [])
        .controller('mineSweeperBoardController', ['$scope', '$injector', 
            '$rootScope',
            function ($scope, $injector, $rootScope) {
                require(['mine_sweeper_board/mineSweeperBoardController'],
                    function (ctrl) {
                        $injector.invoke(ctrl, this, {'$scope' : $scope,
                        '$rootScope' : $rootScope});
                    }
                );
            }]
        )
        .controller('timingController', ['$scope', '$injector', '$rootScope',
            '$timeout', 
            function ($scope, $injector, $rootScope, $timeout) {
                require(['timer/timingController'],
                    function (ctrl) {
                        $injector.invoke(ctrl, this, {'$scope' : $scope,
                        '$rootScope' : $rootScope, '$timeout' : $timeout});
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
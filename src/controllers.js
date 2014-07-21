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
        );
});
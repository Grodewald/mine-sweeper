/*global define, require */
define(['angular', 'service'], function (angular) {
    'use strict';
    return angular.module('mineSweeper.controllers', ['mineSweeper.service'])
        .controller('mineSweeperBoardController', ['$scope', '$injector', 
            '$rootScope', 'bombFactory', 'boardFactory',
            function ($scope, $injector, $rootScope, 
                bombFactory, boardFactory) {
                    require(['mine_sweeper_board/mineSweeperBoardController'],
                        function (ctrl) {
                            $injector.invoke(ctrl, this, {'$scope' : $scope,
                            '$rootScope' : $rootScope, 
                            'bombFactory' : bombFactory,
                            'boardFactory' : boardFactory});
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
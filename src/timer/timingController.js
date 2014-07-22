/*global define*/
define(['timer/timer', 'globalEvents'], function(timer, events) {
    'use strict';
    
    return ['$scope', '$rootScope', '$timeout', 
        function($scope, $rootScope, $timeout) {
            var handleGameCompleted, handleGameRequested, updateClock;

            handleGameRequested = function () {
                timer.stop();
                timer.reset();
                timer.start();
            };

            handleGameCompleted = function () {
                $rootScope.$broadcast('');
            };
            $scope.onTimeout = function () {
                $scope.seconds = timer.getSeconds();
                $scope.minutes = timer.getMinutes();
                $timeout($scope.onTimeout, 200);
            };

            updateClock = $timeout($scope.onTimeout, 200);

            $scope.templateUri = 'views/timing.html';
            $scope.$on(events.gameEvents.gameRequested, handleGameRequested);
            $scope.$apply();
        }
    ];
});
/*global define*/
define(['timer/timer', 'globalEvents', 'timer/timerEvents'], 
    function(timer, events, timerEvents) {
    'use strict';
    
    return ['$scope', '$rootScope', '$timeout', 
        function($scope, $rootScope, $timeout) {
            var handleGameRequested, handleGameCompleted, timelimit = -1,
                handleFirstCellSwept, updateClock, timeExpired;

            handleGameRequested = function (event, data) {
                timelimit = -1;
                if (data && data.timelimit) {
                    timelimit = data.timelimit;
                }
                timer.stop();
            };

            handleFirstCellSwept = function () {
                timer.stop();
                timer.reset();
                if (timelimit > 0 ) { 
                    timer.startCountDown(timelimit);
                } else {
                    timer.start();
                }
            };

            handleGameCompleted = function () {
                //$rootScope.$broadcast('');
                timer.stop();
            };

            timeExpired = function () {
                $rootScope.$broadcast(timerEvents.timeExpired, []);
            };

            $scope.onTimeout = function () {
                $scope.seconds = timer.getSeconds();
                $scope.minutes = timer.getMinutes();
                $timeout($scope.onTimeout, 200);
            };

            timer.setTimeExpiredCallback(timeExpired);
            updateClock = $timeout($scope.onTimeout, 200);

            $scope.templateUri = 'views/timing.html';
            $scope.$on(events.boardEvents.firstCellSwept, 
                handleFirstCellSwept);
            $scope.$on(events.gameEvents.gameWon, handleGameCompleted);
            $scope.$on(events.gameEvents.gameLost, handleGameCompleted);
            $scope.$on(events.gameEvents.gameRequested, handleGameRequested);
            $scope.$apply();
        }
    ];
});
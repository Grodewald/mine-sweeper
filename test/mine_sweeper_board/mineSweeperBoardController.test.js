/*global define, describe, beforeEach, it, expect, alert*/
define(['mine_sweeper_board/mineSweeperBoardController',
    'mine_sweeper_board/boardFactory', 'mine_sweeper_board/bombFactory',
    'globalEvents'], function (ctrl, boardFactory, bombFactory, events) {
    'use strict';
    describe('mineSweeperBoardController tests', function () {
        var $scope, $rootScope, mineSweeperBoardController;
        
        mineSweeperBoardController = ctrl[ctrl.length -1];

        beforeEach(function () {
            $scope = (function () {
                var on, raiseEvent, eventHandlerArray = [];

                on = function (eventName, handler) {
                    eventHandlerArray.push( {
                        eventName : eventName, handler : handler});
                }; 

                raiseEvent = function(eventName, data) {
                    eventHandlerArray.filter(function (element) {
                        return element.eventName === eventName;
                    }).forEach(function (element) {
                        element.handler(eventName, data);
                    });
                };

                return {
                    $on : on,
                    raiseEvent : raiseEvent,
                    eventHandlerArray : eventHandlerArray,
                    $apply : function () {} 
                };
            })();

            $rootScope = {};

            mineSweeperBoardController($scope, $rootScope, 
                    bombFactory, boardFactory);
        });
        
        describe('When the controller is initialized', function () {
            it('$scope.templateUri should be views/mineSweeperBoard.html', 
                function () {
                    expect($scope.templateUri)
                        .toBe('views/mineSweeperBoard.html');
                }
            );

            it('events.gameEvents.gameRequested should be subscribed', 
                function () {
                    expect($scope.eventHandlerArray.filter(function (element) {
                        return element.eventName === 
                            events.gameEvents.gameRequested;
                    }).length).toBe(1);
                });
        });

        describe('When events.gameEvents.gameRequested is raised', function () { 
            it('$scope.cellsToSweep should be length * width - bombcount', 
                function () {
                    $scope.raiseEvent(events.gameEvents.gameRequested, {
                        name : 'game', height : 10, width : 10, bombs : 10 
                    });
                    expect($scope.cellsToSweep).toBe(90);
                } 
            );
        });

    });
});
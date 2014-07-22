/*global define, beforeEach, it, expect, describe */
define(['mine_sweeper_game/gameController'], function (ctrl) {
    'use strict';
    describe('gameController tests', function() {
        var applyWasCalled = false, broadcast, brodcastArgs, 
            scope, rootScope, gameController;

        gameController = ctrl[ctrl.length -1];
        broadcast = function (eventName, data) {
                        brodcastArgs = {
                            eventName : eventName,
                            data : data
                        };
                    };

        beforeEach(function () {
            applyWasCalled = false;
            brodcastArgs = {};
            scope = {
                $apply : function () { applyWasCalled = true; },
                $on : function() {} 
            };
            rootScope = {
                $broadcast : broadcast
            };
            gameController(scope, rootScope);
        });

        it('should define a selectGame method on $scope', function () {
            expect(scope.selectGame).toBeDefined();

        });
        it('scope.selectGame() should broadcast the "gameRequested" event', 
            function () {
                scope.selectGame();
                expect(brodcastArgs.eventName).toBe('gameRequested');

            }  
        );

    });
});
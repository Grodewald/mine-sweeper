/*global define, describe, beforeEach, it, expect, spyOn*/
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

            $rootScope = {
                $broadcast : function() {}
            };   
        });
        
        describe('When the controller is initialized', function () {

            beforeEach( function () {
                mineSweeperBoardController($scope, $rootScope, 
                    bombFactory, boardFactory);
            });

            it('$scope.templateUri should be views/mineSweeperBoard.html', 
                function () {
                    expect($scope.templateUri)
                        .toBe('views/mineSweeperBoard.html');
                }
            );
        });

        describe('When events.gameEvents.gameRequested is raised', function () {

            beforeEach( function () {
                mineSweeperBoardController($scope, $rootScope,
                    bombFactory, boardFactory);
            });

            var verifyHandler = function(height, width, bombs) {
                $scope.raiseEvent(events.gameEvents.gameRequested, {
                    name : 'game', height : height, 
                    width : width , bombs : bombs
                });   
            };

            it('$scope.cellsToSweep should be length * width - bombcount',
                function () {
                    
                    [   [10,10,10,90], [5,5,2,23], [20,20,50,350], 
                        [12,12,44,100], [1,1,1,0], [7,7,4,45], [11,11,22,99],
                        [15,2,10,20] 
                    ].forEach(function (element) { 
                        verifyHandler.apply(this, element); 
                        expect($scope.cellsToSweep).toBe(element[3]); 
                    });
                } 
            );

            it('$scope.board.length should be height', function () {
                [   [10,10,10,10], [5,5,2,5], [20,20,50,20], [12,12,44,12],
                        [1,1,1,1], [7,7,4,7], [11,11,22,11], [15,2,10,15] 
                    ].forEach(function (element) { 
                        verifyHandler.apply(this, element); 
                        expect($scope.board.length).toBe(element[3]); 
                    });

            });

            it('$scope.board[0].length should be width', function () {
                [   [10,10,10,10], [5,5,2,5], [20,20,50,20], [12,12,44,12],
                        [1,1,1,1], [7,7,4,7], [11,11,22,11], [15,2,10,2] 
                    ].forEach(function (element) { 
                        verifyHandler.apply(this, element); 
                        expect($scope.board[0].length).toBe(element[3]); 
                    });
            });

        });

        describe('When a board in initialized', function () {
            beforeEach( function() {
                var mockBombFactory = {
                    create : function() {
                        // for a 5x5 board this equates to 
                        // [[1,2], [1,3], [2,2], [2,3]]
                        return [7,8,12,13]; 
                    }
                };

                mineSweeperBoardController($scope, $rootScope, 
                    mockBombFactory, boardFactory);

                $scope.raiseEvent(events.gameEvents.gameRequested, {
                    name : 'game', height : 5, width : 5 , bombs : 4
                });
            });

            describe('and an empty cell is swept', function () {
                it('should raise the events.boardEvents.firstCellSwept', 
                    function () {
                    spyOn($rootScope, '$broadcast');
                    $scope.sweepCell($scope.board[1][1]);
                    expect($rootScope.$broadcast).toHaveBeenCalledWith(
                        events.boardEvents.firstCellSwept, []);
                });

                it('should set the cell\'s style to \'swept\'', function () {
                    $scope.sweepCell($scope.board[1][1]);
                    expect($scope.board[1][1].style).toBe('swept');
                });

                describe('and the empty cell is adjacent to a bomb', 
                    function () {
                    it('should decrement $scope.cellsToSweep by 1', 
                        function () {
                        $scope.sweepCell($scope.board[1][1]);
                        expect($scope.cellsToSweep).toBe(20);  

                    });
                });

                describe('and the cell is not adjacent to a bomb',
                    function () {
                    it('should sweep all adjacent cells until it reaches ' +
                        ' one that touches a bomb', function () {
                        $scope.sweepCell($scope.board[0][0]);
                        expect($scope.cellsToSweep).toBe(5);    

                    });
                });
            });

            describe('and a cell is flagged', function () {
                it('should have a style of \'flagged\'', function () {
                    $scope.flagCell($scope.board[1][2]);
                    expect($scope.board[1][2].style).toBe('flagged');
                });

                it('should have a style of \'question\' if it is flagged twice',
                    function () {
                        $scope.flagCell($scope.board[1][2]);
                        $scope.flagCell($scope.board[1][2]);
                        expect($scope.board[1][2].style).toBe('question');
                    }
                );

                it('should have a style of \'unswept\' if it is flagged 3x',
                    function () {
                        $scope.flagCell($scope.board[1][2]);
                        $scope.flagCell($scope.board[1][2]);
                        $scope.flagCell($scope.board[1][2]);
                        expect($scope.board[1][2].style).toBe('unswept');
                    }
                );

                it('should decrement the bomb count by 1', function () {
                    $scope.flagCell($scope.board[1][2]);
                    expect($scope.unflaggedBombs).toBe(3);
                });

                it('should reincrement the bomb count when changed to question',
                    function () {
                    $scope.flagCell($scope.board[1][2]);
                    $scope.flagCell($scope.board[1][2]);
                    expect($scope.unflaggedBombs).toBe(4);
                    }
                );

                it('should set style to \'question\' if all bombs are flagged', 
                    function () {
                        $scope.flagCell($scope.board[1][2]);
                        $scope.flagCell($scope.board[2][2]);
                        $scope.flagCell($scope.board[2][3]);
                        $scope.flagCell($scope.board[3][3]);
                        $scope.flagCell($scope.board[3][4]);
                        expect($scope.board[3][4].style).toBe('question');

                    }
                );

                it('should not allow sweeping of a flagged cell', function () {
                    $scope.flagCell($scope.board[1][2]);
                    $scope.sweepCell($scope.board[1][2]);
                    expect($scope.cellsToSweep).toBe(21);
                    expect($scope.board[1][2].style).toBe('flagged');
                });

                it('should not allow sweeping of a question cell', function () {
                    $scope.flagCell($scope.board[1][2]);
                    $scope.flagCell($scope.board[1][2]);
                    $scope.sweepCell($scope.board[1][2]);
                    expect($scope.cellsToSweep).toBe(21);
                    expect($scope.board[1][2].style).toBe('question');
                });
            });

            describe('and all empty cells are swept', function () {
                it('should raise the events.boardEvents.lastCellSwept event', 
                    function () {
                        spyOn($rootScope, '$broadcast');
                        $scope.sweepCell($scope.board[0][0]);
                        $scope.sweepCell($scope.board[0][2]);
                        $scope.sweepCell($scope.board[0][3]);
                        $scope.sweepCell($scope.board[0][4]);
                        $scope.sweepCell($scope.board[1][4]);
                        $scope.sweepCell($scope.board[2][4]);
                        expect($rootScope.$broadcast).toHaveBeenCalledWith(
                            events.boardEvents.lastCellSwept, []);
                    }
                );
            });

            describe('and a bomb is swept', function () {
                it('should raise the events.boardEvents.bombSwept event', 
                    function () {
                        spyOn($rootScope, '$broadcast');
                        $scope.sweepCell($scope.board[2][2]);
                        expect($rootScope.$broadcast).toHaveBeenCalledWith(
                            events.boardEvents.bombSwept, []);
                    }
                );

            });

            describe('When events.gameEvents.gameLost is raised', function () {

                it('should disallow sweeping a cell', function () {
                    $scope.raiseEvent(events.gameEvents.gameLost, []);
                    $scope.sweepCell($scope.board[1][1]);
                    expect($scope.board[1][1].style).toBe('unswept');
                });

                it('should disallow flagging a cell', function () {
                    $scope.raiseEvent(events.gameEvents.gameLost, []);
                    $scope.flagCell($scope.board[1][1]);
                    expect($scope.board[1][1].style).toBe('unswept');
                });
            });

            describe('When events.gameEvents.gameWon is raised', function () {
                
                it('should disallow sweeping a cell', function () {
                    $scope.raiseEvent(events.gameEvents.gameWon, []);
                    $scope.sweepCell($scope.board[1][1]);
                    expect($scope.board[1][1].style).toBe('unswept');
                });

                it('should disallow flagging a cell', function () {
                    $scope.raiseEvent(events.gameEvents.gameWon, []);
                    $scope.flagCell($scope.board[1][1]);
                    expect($scope.board[1][1].style).toBe('unswept');
                });
            });
        });


    });
});
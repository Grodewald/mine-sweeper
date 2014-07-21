/*global define, describe, it, expect*/
define(['mine_sweeper_board/boardFactory'], function (boardFactory) {
    'use strict';
    describe('boardFactory tests:', function () {
        describe('boardFactory.create', function() {
            it('should return an null when called with zero parameters', 
                function() {
                expect(boardFactory.create()).toBe(null);
            });

            it('should return null when called with 1 parameter', function() {
                expect(boardFactory.create(1)).toBe(null);
            });
            it('should return null when called with a zero or negative' +
                ' parameter', 
                function() {
                    expect(boardFactory.create(0,5)).toBe(null);
                    expect(boardFactory.create(5,0)).toBe(null);
                    expect(boardFactory.create(-1,5)).toBe(null);
                    expect(boardFactory.create(5,-1)).toBe(null);
                }
            );
            it('should return null when called with a non-integer negative' +
                ' parameter', 
                function() {
                    expect(boardFactory.create(1.5,5)).toBe(null);
                    expect(boardFactory.create(5,1.5)).toBe(null);
                    expect(boardFactory.create('abc',5)).toBe(null);
                    expect(boardFactory.create(5,'xyz')).toBe(null);
                }
            );
            it('should return an object with width and height matching the' +
                ' first two parameters',
                function() {
                    var validateBoardSize;

                    validateBoardSize = function(width, height) {
                        var board = boardFactory.create(width, height);
                        expect(board.width).toBe(width);
                        expect(board.height).toBe(height);
                    };

                    validateBoardSize(10,10);
                    validateBoardSize(5,3);
                    validateBoardSize(117,102);
                }
            );
            describe('when called with valid size parameters', function () {
                it('should return bombCount === 0 when called with only 2' + 
                    ' parameters',
                    function () {
                        expect(boardFactory.create(10,10).bombCount).toBe(0);
                    }
                );

                it('should return bombCount === bombs.length if all' + 
                    ' bombs are in range.', 
                    function () {
                        expect(boardFactory.create(10,10,[10,15,22,92,95,97])
                            .bombCount).toBe(6);    
                    }
                );

                it('should return bombCount === bombs.length minus' +
                    'the number of bombs that are out of range',
                    function () {
                        expect(boardFactory.create(10,10,
                            [-10,-1,5,50,75,101,105,1000])
                            .bombCount).toBe(3);

                    }
                );

                it('should return bombCount === bombs.length minus' +
                    'the number of bombs that are not integers',
                    function () {
                        expect(boardFactory.create(10,10,
                            [0.3,0,1,2,5.5,90.2,'a','bed',99])
                            .bombCount).toBe(4);
                    }
                );

                it('should return bombCount == bombs.length minus' + 
                    'the number of duplicates',
                    function () {
                        expect(boardFactory.create(10,10,
                            [0,0,0,1,1,1,20,99,99,99,99])
                            .bombCount).toBe(4);
                    }
                );
            });
        });

        describe('checkCell', function () {
            var bombArrayMapper, verifyBombCell;

            bombArrayMapper = function (boardWidth, array) {
                return array.map(function (value) {
                    return value[0] + (boardWidth * value[1]);
                });
            }; 

            verifyBombCell = function(bombs, cellToCheck, expectedValue) {
                expect(boardFactory.create(10,10,bombArrayMapper(10,bombs))
                    .checkCell(cellToCheck[0], cellToCheck[1]))
                    .toBe(expectedValue);
            };

            it('should return 0 when the cell does not contain a bomb' + 
                ' AND is not adjacent to a bomb', 
                function() {
                    verifyBombCell([],[4, 5],0);
                }
            );

            it('should return 0 when the cell is out of range', function() {
                verifyBombCell([],[0, 10],0);
                verifyBombCell([],[10, 0],0);
                verifyBombCell([],[-1, 1],0);
                verifyBombCell([],['abc', 3],0);
            });

            it('should return -1 when the cell contains a bomb', function() {
                verifyBombCell([[4, 5]], [4, 5], -1);
            });

            it('should return 1 when exacctly 1 adjacent cell' + 
                ' conatins a bomb.', 
                function () {
                    verifyBombCell([[4, 4]], [5, 5], 1);
                    verifyBombCell([[4, 5]], [5, 5], 1);
                    verifyBombCell([[4, 6]], [5, 5], 1);
                    verifyBombCell([[5, 4]], [5, 5], 1);
                    verifyBombCell([[5, 6]], [5, 5], 1);
                    verifyBombCell([[6, 4]], [5, 5], 1);
                    verifyBombCell([[6, 5]], [5, 5], 1);
                    verifyBombCell([[6, 6]], [5, 5], 1);
                }
            );

            it('should return 2 when exactly 2 adjacent cells' +
                'conatin a bomb', 
                function() {
                    verifyBombCell([[4, 4], [6, 6]], [5, 5], 2);
                    verifyBombCell([[4, 5], [5, 4]], [5, 5], 2);
                    verifyBombCell([[4, 6], [6, 4]], [5, 5], 2);
                }
            );

            it('should return 3 when exactly 3 adjacent cells' +
                'conatin a bomb', 
                function() {
                    verifyBombCell([[4, 4], [5, 4], [6, 6]], [5, 5], 3);
                    verifyBombCell([[4, 5], [5, 4], [6, 5]], [5, 5], 3);
                    verifyBombCell([[4, 4], [4, 6], [6, 4]], [5, 5], 3);
                }
            );

            it('should return 4 when exactly 4 adjacent cells' +
                'conatin a bomb', 
                function() {
                    verifyBombCell([[4, 4], [4, 5], [5, 4], [6, 6]], 
                        [5, 5], 4);
                    verifyBombCell([[4, 5], [5, 4], [6, 4], [6, 5]], 
                        [5, 5], 4);
                    verifyBombCell([[4, 4], [4, 6], [5, 6], [6, 4]], 
                        [5, 5], 4);
                }
            );

            it('should return 8 when all 8 adjacent cells' +
                'conatin a bomb', 
                function() {
                    verifyBombCell([
                        [4, 4], [4, 5], [4, 6],
                        [5, 4], [5, 6],
                        [6, 4], [6, 5], [6, 6]],
                        [5, 5], 8);
                }
            );

            it('should not count wrapped adjacent cells', function() {
                verifyBombCell([[0,0], [0,1], [0,2]], [9,0], 0 );
            });
        });
    });
});
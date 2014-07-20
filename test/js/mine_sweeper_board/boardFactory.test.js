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
    });
});
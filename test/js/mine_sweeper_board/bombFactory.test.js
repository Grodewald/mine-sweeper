/*global define, describe, it, expect, beforeEach*/
define(['mine_sweeper_board/bombFactory'], function (bombFactory) {
    'use strict';
    describe('bombFactory tests :', function () {
        describe('bombFactory.create', function () {

            it('should return the empty array when called with' + 
                ' fewer than 3 parameters', 
                function () {
                    expect(bombFactory.create().length).toBe(0);
                    expect(bombFactory.create(1).length).toBe(0);
                    expect(bombFactory.create(1,2).length).toBe(0);
                }
            );

            it('should return the empty array if there are more bombs' + 
                ' than spaces', 
                function () {
                    expect(bombFactory.create(10,10,101).length).toBe(0);
                }
            );

            describe('when passed a valid arguements', function () {
                var twentyBombs, oneHundredBombs;

                beforeEach( function() {
                    twentyBombs = bombFactory.create(10,10,20);
                    oneHundredBombs = bombFactory.create(10,10,100);
                });

                it('should return an array with the length === bombs', 
                    function() {
                        expect(twentyBombs.length).toBe(20);
                        expect(oneHundredBombs.length).toBe(100);
                    }
                );
                it('should return an array with max < width * height', 
                    function() {
                        expect(Math.max.apply(Math, twentyBombs))
                            .toBeLessThan(100);
                        expect(Math.max.apply(Math, oneHundredBombs))
                            .toBeLessThan(100);
                    }
                );
                it('should return an array with min >= 0', function () {
                    expect(Math.min.apply(Math, twentyBombs))
                        .not.toBeLessThan(0);
                    expect(Math.min.apply(Math, oneHundredBombs))
                        .not.toBeLessThan(0);
                });
                it('should return an array with unique elements', function() {
                    var uniqueElementTest = function (array) {
                        return array.sort().reduce( 
                            function (prev, curr, index, ary) {
                                if (! prev) {
                                    return prev;
                                }
                                if (index > 0) {
                                    return curr !== ary[index -1];
                                }
                                return true;
                            }, 
                        true);
                    };
                    expect(uniqueElementTest(twentyBombs)).toBeTruthy();
                    // technically erratic test... but highly unlikely
                    expect(uniqueElementTest(oneHundredBombs)).toBeTruthy();
                });

                it('should return a sorted array', function () {
                    var sortedArrayTest = function (array) {
                        return array.reduce(
                            function (prev, curr, index, ary) {
                                if (! prev) {
                                    return prev;
                                }
                                if (index > 0) {
                                    return curr >= ary[index -1];
                                }
                                return true;
                            }, true);
                    };
                    expect(sortedArrayTest(twentyBombs)).toBeTruthy();
                    expect(sortedArrayTest(oneHundredBombs)).toBeTruthy();
                });
            });
        });
    });
});
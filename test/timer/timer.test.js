/*global define, describe, beforeEach, it, setTimeout,
    expect, jasmine, afterEach */
define(['timer/timer'], function(timer) {
    'use strict';
    describe('timer tests', function (){
        beforeEach( function() {
            timer.reset();
            jasmine.clock().install();
        });

        afterEach( function() {
            jasmine.clock().uninstall();
        });

        describe('the interval between start and stop', function () {
            it('is 6300ms getSeconds should return 6', function() {
                timer.start();
                setTimeout( function() { timer.stop(); }, 6300);
                jasmine.clock().tick(6301);
                expect(timer.getSeconds()).toBe(6);
            });

            it('is 64200ms getSeconds should return 4', function() {
                timer.start();
                setTimeout( function() { timer.stop(); }, 64200);
                jasmine.clock().tick(64201);
                expect(timer.getSeconds()).toBe(4);
            });

            it('is 64200ms getMinutes should return 1', function() {
                timer.start();
                setTimeout( function() { timer.stop(); }, 64200);
                jasmine.clock().tick(64201);
                expect(timer.getMinutes()).toBe(1);
            });

            it('is 184200ms getMinutes should return 4', function() {
                timer.start();
                setTimeout( function() { timer.stop(); }, 184200);
                jasmine.clock().tick(184201);
                expect(timer.getMinutes()).toBe(3);
            });
        });
    });
});
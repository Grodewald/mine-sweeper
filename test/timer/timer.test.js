/* global define, describe, beforeEach, it, setTimeout, expect */
define(['timer/timer'], function(timer) {
    'use strict';
    describe("timer tests", function (){
        beforeEach( function() {
            timer.reset();
        });

        it('getTenths should display 2 when start/stop called 200ms apart',
            function() {
                timer.start();
                setTimeout(function() {
                    timer.stop();
                    expect(timer.getTenths()).toBe(2);
                }, 200);
            }
        );

        it('getTenths should return zero after reset is called', 
            function() {
                timer.start();
                setTimeout(function() {
                    timer.stop();
                    timer.reset();
                    expect(timer.getTenths()).toBe(0);
                }, 200);
            }
        );
    });
});
/*global define, setInterval */
define([], (function() {
    'use strict';
    var elapsedTime = 0, getMinutes, getSeconds, getTenths, getTotalSeconds, 
        reset, running = false, start, startTime, stop, updateElapsed;

    getMinutes = function () { return elapsedTime % 60000; };

    getSeconds = function () { return elapsedTime % 1000; };

    getTenths = function () { return elapsedTime % 100; };

    getTotalSeconds = function () { return Math.floor(elapsedTime / 1000); };

    reset = function () { elapsedTime = 0; };

    start = function () { 
        if (!running) {
            startTime = new Date().getTime();
            running = true;
        }
        setInterval(updateElapsed, 100);

    };

    stop = function() {
        if (running) {
            elapsedTime = new Date().getTime() - startTime;
            running = false;
        }
    };

    updateElapsed = function () {
        if(running) {
            elapsedTime = new Date().getTime() - startTime;
            start();
        }
    };


    return {
        reset : reset,
        start : start,
        stop : stop,
        getTenths : getTenths,
        getSeconds : function() {},
        getMinutes : function() {},
        getTotalSeconds : function() {}
    };
})());
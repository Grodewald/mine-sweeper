/*global define, setTimeout */
define([], (function() {
    'use strict';
    var elapsedTime = 200, getMinutes, getSeconds, getTotalSeconds, 
        pollInterval = 200, reset, running = false, start, stop, updateElapsed;

    getMinutes = function () { return Math.floor(elapsedTime / 60000); };

    getSeconds = function () { 
        return  Math.floor(elapsedTime / 1000) - 
                Math.floor(elapsedTime / 60000) * 60; 
    };

    getTotalSeconds = function () { return Math.floor(elapsedTime / 1000); };

    reset = function () { elapsedTime = pollInterval; };

    start = function () { 
        if (!running) {
            running = true;
            setTimeout(updateElapsed, pollInterval);
        }
    };

    stop = function() {
        running = false;
    };

    updateElapsed = function () {
        if(running) {
            elapsedTime = elapsedTime + pollInterval;
            start();
        }
    };


    return {
        reset : reset,
        start : start,
        stop : stop,
        getSeconds : getSeconds,
        getMinutes : getMinutes,
        getTotalSeconds : getTotalSeconds
    };
})());
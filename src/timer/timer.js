/*global define, setTimeout*/
define([], (function() {
    'use strict';
    var countdown = false, elapsedTime = 200, getMinutes, getSeconds,  
        getTotalSeconds, pollInterval = 200, reset, running = false, 
        start, startCountDown, stop, timeExpiredCallback, updateElapsed;

    getMinutes = function () { return Math.floor(elapsedTime / 60000); };

    getSeconds = function () { 
        return  Math.floor(elapsedTime / 1000) - 
                Math.floor(elapsedTime / 60000) * 60; 
    };

    getTotalSeconds = function () { return Math.floor(elapsedTime / 1000); };

    reset = function () { 
        elapsedTime = pollInterval; 
        countdown = false;
    };

    start = function () { 
        if (!running) {
            running = true;
            setTimeout(updateElapsed, pollInterval);
        }
    };

    startCountDown = function (seconds) {
        if (!running) {
            running = true;
            countdown = true;
            elapsedTime = seconds * 1000;
            setTimeout(updateElapsed, pollInterval);
        }
    };

    stop = function() {
        running = false;
    };

    updateElapsed = function () {
        if(running) {
            if (countdown) {
                elapsedTime = elapsedTime - pollInterval;
                if (elapsedTime > 0) {
                    setTimeout(updateElapsed, pollInterval);
                }
                else {
                    if (timeExpiredCallback && 
                        typeof timeExpiredCallback === 
                        'function') {
                        timeExpiredCallback();
                    }
                }
            } else {
                elapsedTime = elapsedTime + pollInterval;
                setTimeout(updateElapsed, pollInterval);
            }
        }
    };


    return {
        reset : reset,
        start : start,
        startCountDown : startCountDown,
        stop : stop,
        getSeconds : getSeconds,
        getMinutes : getMinutes,
        getTotalSeconds : getTotalSeconds,
        setTimeExpiredCallback : function (callback) {
            timeExpiredCallback = callback;
        }
    };
})());
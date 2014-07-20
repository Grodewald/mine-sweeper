/*global define*/
define([], (function() {
    'use strict';
    var create;

    create = function(width, height, bombs) {

        var generateBombArray, shuffleArray;

        generateBombArray = function () {
            var bombArray = new Array(width * height);
            for ( var i = 0; i < width * height; i = i + 1 ) {
                bombArray[i] = i;
            }
            return bombArray;
        };

        shuffleArray = function (array) {
            var swapIndex, swapValue;

            for (var i = array.length - 1; i > 0; i = i -1) {
                swapIndex = Math.floor(Math.random() * i);
                swapValue = array[swapIndex];
                array[swapIndex] = array[i];
                array[i] = swapValue;
            }

            return array;
        };

        if (!bombs || bombs > (width * height)) {
            return [];
        }
        return shuffleArray(generateBombArray(bombs)).slice(0, bombs)
                .sort(function (a,b) { return a - b; });
    };

    return {
        create : create
    };
})());
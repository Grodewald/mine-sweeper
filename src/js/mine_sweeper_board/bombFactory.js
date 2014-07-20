/*global define*/
define([], (function() {
    'use strict';
    var create;

    create = function(width, height, bombs) {

        var generateBombArray;

        generateBombArray = function () {
            var bombArray = new Array(bombs ? bombs : 0);
            for ( var i = 0; i < bombs; i = i + 1 ) {
                bombArray[i] = i;
            }
            return bombArray;
        };

        if (bombs > (width * height)) {
            return [];
        }
        return generateBombArray();
    };

    return {
        create : create
    };
})());
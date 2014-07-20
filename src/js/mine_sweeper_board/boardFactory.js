/*global define*/
define([], (function() {
    'use strict';
    var testForInt, create;

    testForInt = function (data) {
        return (typeof data === 'number' && (data % 1) === 0);
    };

    create = function (width, height, bombs) {
        var testForInvalidHeightandWidth, testForInvalidBombCount;

        testForInvalidHeightandWidth = function () {
            return !(testForInt(width) && testForInt(height) &&
                width > 0 && height > 0);
        };

        testForInvalidBombCount = function () {
            return bombs > (width * height);
        };

        if (testForInvalidHeightandWidth() || testForInvalidBombCount()) {
            return null;
        }
        return {
            width : width,
            height : height,
            bombCount : bombs ? bombs : 0
        };
    };

    return {
        create : create
    };
})());
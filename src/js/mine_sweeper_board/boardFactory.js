/*global define*/
define([], (function() {
    'use strict';
    var testForInt, create;

    testForInt = function (data) {
        return (typeof data === 'number' && (data % 1) === 0);
    };

    create = function (width, height, bombs) {
        var bombArray, filterDuplicates, testForInvalidHeightandWidth,
            testForValidBomb;

        filterDuplicates = function (array) {
            var previousValues = [];
            return array.filter( function (value) {
                if (previousValues.indexOf(value) === -1) {
                    previousValues.push(value);
                    return true;
                }
                return false;
            });
        };

        testForInvalidHeightandWidth = function () {
            return !(testForInt(width) && testForInt(height) &&
                width > 0 && height > 0);
        };

        testForValidBomb = function (bomb) {
            return testForInt(bomb) && bomb >= 0 && bomb < width * height;
        };

        if (testForInvalidHeightandWidth()) {
            return null;
        }

        if(bombs) {
            bombArray = filterDuplicates(bombs.filter(testForValidBomb));
        }

        return {
            width : width,
            height : height,
            bombCount : bombs ? bombArray.length : 0
        };
    };

    return {
        create : create
    };
})());
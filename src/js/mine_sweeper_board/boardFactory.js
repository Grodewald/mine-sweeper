/*global define*/
define([], (function() {
    'use strict';
    var testForInt, create;

    testForInt = function (data) {
        return (typeof data === 'number' && (data % 1) === 0);
    };

    create = function (width, height, bombs) {
        var boardWidth = width, boardHeight = height, bombArray, checkCell,
            filterDuplicates, testForInvalidHeightandWidth, testForValidBomb;

        checkCell = function (width, height, checkAdjacentCells) {
            var adjacentBombs = 0, translateToBombValue;

            translateToBombValue = function (width, height) {
                return width + (height * boardWidth);
            };

            if (bombArray.indexOf(translateToBombValue(width,height)) !== -1) {
                return -1;
            }

            if(checkAdjacentCells) {
                adjacentBombs = adjacentBombs + 
                    (checkCell(width -1, height -1, false) * -1);
                adjacentBombs = adjacentBombs + 
                    (checkCell(width -1, height, false) * -1);
                adjacentBombs = adjacentBombs + 
                    (checkCell(width -1, height +1, false) * -1);
                adjacentBombs = adjacentBombs + 
                    (checkCell(width, height -1, false) * -1);
                adjacentBombs = adjacentBombs + 
                    (checkCell(width, height + 1, false) * -1);
                adjacentBombs = adjacentBombs + 
                    (checkCell(width +1, height -1, false) * -1);
                adjacentBombs = adjacentBombs + 
                    (checkCell(width +1, height, false) * -1);
                adjacentBombs = adjacentBombs + 
                    (checkCell(width +1, height +1, false) * -1);
            }
            
            return adjacentBombs;
                   
        };

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
        else {
            bombArray = [];
        }

        return {
            checkCell : function (width, height) { 
                return checkCell(width, height, true); 
            },
            bombCount : bombs ? bombArray.length : 0,
            height : boardHeight,
            width : boardWidth            
        };
    };

    return {
        create : create
    };
})());
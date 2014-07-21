/*global define */
define(['mine_sweeper_board/boardFactory',
    'mine_sweeper_board/bombFactory'],
    function(boardFactory, bombFactory) {
        'use strict';

        var bombs, board, cellCreator, checkBoundry,
            gameMatrix, sweepCell, sweepNeighbors,
            transformBombText;

        
        cellCreator = function (board) {
            var cellRows = new Array(board.height);
            for (var i = 0; i < board.height; i = i + 1) {
                cellRows[i] = new Array(board.width);
                for (var j = 0; j < board.width; j = j + 1) {
                    cellRows[i][j] = { 
                        x : j, 
                        y : i, 
                        bomb : transformBombText(board.checkCell(j,i)),
                        style : 'unswept',
                        hasBeenSwept : false
                    };
                }
            }
            return cellRows;
        };

        checkBoundry = function (width,height) {
            return (width >= 0 && width < board.width &&
                height >= 0 && height < board.height);            
        };

        transformBombText = function(number) {
            if (number === 0) {
                return ' ';
            }
            if (number === -1) {
                return 'X';
            }
            return number;
        };

        
        sweepCell = function (cell) {
            if(cell.hasBeenSwept) {
                return;
            }
            cell.style = 'swept';
            cell.hasBeenSwept = true;
            if (cell.bomb === ' ') {
                sweepNeighbors(cell);
            }
        };

        sweepNeighbors = function (cell) {
            var width = cell.x, height = cell.y;
            if (checkBoundry(width - 1,height - 1)) {
                sweepCell(gameMatrix[height - 1][width - 1]);
            }
            if (checkBoundry(width -1 ,height)) {
                sweepCell(gameMatrix[height][width - 1]);
            }
            if (checkBoundry(width -1 ,height + 1)) {
                sweepCell(gameMatrix[height + 1][width - 1]);
            }
            if (checkBoundry(width,height - 1)) {
                sweepCell(gameMatrix[height -1 ][width]);
            }
            if (checkBoundry(width,height + 1)) {
                sweepCell(gameMatrix[height + 1][width]);
            }
            if (checkBoundry(width + 1,height - 1)) {
                sweepCell(gameMatrix[height - 1][width + 1]);
            }
            if (checkBoundry(width + 1,height)) {
                sweepCell(gameMatrix[height][width + 1]);
            }
            if (checkBoundry(width + 1,height + 1)) {
                sweepCell(gameMatrix[height + 1][width + 1]);
            }
            

        };

        bombs = bombFactory.create(6,6,3);
        board = boardFactory.create(6,6,bombs);
        gameMatrix = cellCreator(board);

        return ['$scope', function($scope) {

            $scope.boardInfo = board.width + ' x ' + board.height + 
                ' bombs: ' + board.bombCount;
            $scope.board = gameMatrix;
            $scope.templateUri = 'views/mineSweeperBoard.html';
            $scope.title = 'Mine Sweeper Board';
            $scope.sweepCell = sweepCell;
            $scope.$apply();
        }];
    }
);
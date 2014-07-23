/*global define */
define(['mine_sweeper_board/boardFactory',
    'mine_sweeper_board/bombFactory', 'globalEvents',
    'mine_sweeper_board/boardEvents'],
    function(boardFactory, bombFactory, globalEvents, boardEvents) {
        'use strict';

        return ['$scope', '$rootScope', function($scope, $rootScope) {
            var bombs, board, cellCreator, checkBoundry, cellsToSweep, 
                firstCellSwept = false, gameMatrix, initGame, 
                initScope, sweepCell, sweepNeighbors, transformBombText;

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

            initGame = function(width, height, bombCount) {
                cellsToSweep = (width * height) - bombCount;
                bombs = bombFactory.create(width, height, bombCount);
                board = boardFactory.create(width, height, bombs);
                gameMatrix = cellCreator(board);
            };

            initScope = function(title) {
                $scope.board = gameMatrix;
                $scope.title = title;
                $scope.boardInfo = board.width + ' x ' + board.height + 
                ' bombs: ' + board.bombCount;
                firstCellSwept = false;

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
                if (! firstCellSwept) {
                    firstCellSwept = true;
                    $rootScope.$broadcast(boardEvents.firstCellSwept, []);
                }
                if (cell.bomb === 'X') {
                    $rootScope.$broadcast(boardEvents.bombSwept, []);
                }
                else {
                    cellsToSweep = cellsToSweep - 1;
                    if (cellsToSweep === 0) {
                        $rootScope.$broadcast(boardEvents.lastCellSwept, []);
                    }
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

            initGame(10,10,8);
            initScope('Default Game');
            $scope.$on(globalEvents.gameEvents.gameRequested, 
                function (event, data) { 
                    initGame (data.width, data.height, data.bombs); 
                    initScope(data.name);                  
                }
            );
            $scope.templateUri = 'views/mineSweeperBoard.html';
            $scope.sweepCell = sweepCell;
            
            $scope.$apply();
        }];
    }
);
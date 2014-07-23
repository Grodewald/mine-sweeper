/*global define */
define(['mine_sweeper_board/boardFactory',
    'mine_sweeper_board/bombFactory', 'globalEvents',
    'mine_sweeper_board/boardEvents'],
    function(boardFactory, bombFactory, globalEvents, boardEvents) {
        'use strict';

        return ['$scope', '$rootScope', function($scope, $rootScope) {
            var bombs, board, cellCreator, checkBoundry, firstCellSwept = false,
                flagCell, gameMatrix, initGame, gameInProgress, 
                initScope, sweepCell, sweepNeighbors;

            cellCreator = function (board) {
                var cellRows = new Array(board.height);
                for (var i = 0; i < board.height; i = i + 1) {
                    cellRows[i] = new Array(board.width);
                    for (var j = 0; j < board.width; j = j + 1) {
                        cellRows[i][j] = { 
                            x : j, 
                            y : i, 
                            bomb : board.checkCell(j,i),
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

            flagCell = function(cell) {
                if (!cell.hasBeenSwept) {
                    if (cell.style === 'flagged') {
                        cell.style = 'question';
                    } else if (cell.style === 'question') {
                        cell.style = 'unswept';
                    } else if (cell.style === 'unswept') {
                        cell.style = 'flagged';
                    }
                }
            };

            initGame = function(width, height, bombCount) {
                $scope.cellsToSweep = (width * height) - bombCount;
                bombs = bombFactory.create(width, height, bombCount);
                board = boardFactory.create(width, height, bombs);
                gameMatrix = cellCreator(board);
                gameInProgress = true;
            };

            initScope = function(title) {
                $scope.board = gameMatrix;
                $scope.title = title;
                $scope.boardInfo = board.width + ' x ' + board.height + 
                ' bombs: ' + board.bombCount;
                firstCellSwept = false;

            };
            
            sweepCell = function (cell) {
                if(cell.hasBeenSwept || !gameInProgress) {
                    return;
                }
                cell.style = 'swept';
                cell.hasBeenSwept = true;
                cell.displayText = cell.bomb;
                if (cell.displayText === -1) {
                    cell.displayText = 'X';
                }
                if (cell.displayText === 0) {
                    cell.displayText = ' ';
                }
                if (cell.bomb === 0) {
                    sweepNeighbors(cell);
                }
                if (! firstCellSwept) {
                    firstCellSwept = true;
                    $rootScope.$broadcast(boardEvents.firstCellSwept, []);
                }
                if (cell.bomb === -1) {
                    $rootScope.$broadcast(boardEvents.bombSwept, []);
                    return;
                }
                $scope.cellsToSweep = $scope.cellsToSweep - 1;
                if ($scope.cellsToSweep === 0) {
                    $rootScope.$broadcast(boardEvents.lastCellSwept, []);
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

            $scope.$on(globalEvents.gameEvents.gameRequested, 
                function (event, data) { 
                    initGame (data.width, data.height, data.bombs); 
                    initScope(data.name);                  
                }
            );
            $scope.$on(globalEvents.gameEvents.gameLost, function() {
                gameInProgress = false;
            });
            $scope.$on(globalEvents.gameEvents.gameWon, function() {
                gameInProgress = false;
            });
            $scope.templateUri = 'views/mineSweeperBoard.html';
            $scope.sweepCell = sweepCell;
            $scope.flagCell = flagCell;
            
            $scope.$apply();
        }];
    }
);
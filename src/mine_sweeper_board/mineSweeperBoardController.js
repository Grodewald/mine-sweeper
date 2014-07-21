/*global define */
define(['mine_sweeper_board/boardFactory',
    'mine_sweeper_board/bombFactory'],
    function(boardFactory, bombFactory) {
        'use strict';

        var bombs, board, cellCreator;

        bombs = bombFactory.create(6,6,9);
        board = boardFactory.create(6,6,bombs);

        cellCreator = function (board) {
            var cellRows = new Array(board.height);
            for (var i = 0; i < board.height; i = i + 1) {
                cellRows[i] = new Array(board.width);
                for (var j = 0; j < board.width; j = j + 1) {
                    cellRows[i][j] = { 
                        x : j, 
                        y : i, 
                        bomb : board.checkCell(j,i)
                    };
                }
            }
            return cellRows;
        };

        return ['$scope', function($scope) {

            $scope.boardInfo = board.width + ' x ' + board.height + 
                ' bombs: ' + board.bombCount;
            $scope.board = cellCreator(board);
            $scope.templateUri = 'views/mineSweeperBoard.html';
            $scope.title = 'Mine Sweeper Board';
            $scope.$apply();
        }];
    }
);
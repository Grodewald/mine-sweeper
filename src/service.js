/*global define, require*/
define(['angular', 'mine_sweeper_board/bombFactory',
    'mine_sweeper_board/boardFactory'], function (angular) {
    'use strict';
    angular.module('mineSweeper.service', [])
        .factory('bombFactory', function () {
            return require('mine_sweeper_board/bombFactory');
        })
        .factory('boardFactory', function () {
            return require('mine_sweeper_board/boardFactory');
        });
});
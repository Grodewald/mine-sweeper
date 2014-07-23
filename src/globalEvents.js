/*global define */
define(['mine_sweeper_board/boardEvents',
        'mine_sweeper_game/gameEvents' ], function (boardEvents, gameEvents) {
    'use strict';
    return {
        boardEvents : boardEvents,
        gameEvents : gameEvents
    };
});
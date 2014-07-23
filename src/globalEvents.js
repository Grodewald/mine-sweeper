/*global define */
define(['mine_sweeper_board/boardEvents',
        'mine_sweeper_game/gameEvents',
        'timer/timerEvents' ], 
    function (boardEvents, gameEvents, timerEvents) {
        'use strict';
        return {
            boardEvents : boardEvents,
            gameEvents : gameEvents,
            timerEvents : timerEvents
        };
    }
);
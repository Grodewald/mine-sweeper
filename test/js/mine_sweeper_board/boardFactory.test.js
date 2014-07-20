define(['mine_sweeper_board/boardFactory'], function (boardFactory) {
    describe('boardFactory tests', function () {
        it ('should return "Hello World!"', function () {
            expect(boardFactory()).toBe('Hello World!');
        });
    })
});
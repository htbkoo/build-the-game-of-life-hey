import Game from './Game';

describe('Game (integration)', function () {
    describe('constructor', function () {
        it('should take {width, height}, create Board accordingly and expose game.getWidth() and game.getHeight() accordingly', function () {
            // given
            const width = 20, height = 30;

            // when
            let game = Game.new({width, height});

            // then
            expect(game.getWidth()).toEqual(width);
            expect(game.getHeight()).toEqual(height);
        });
    });

    describe('isLiveAt', function () {
        it('should expose isLiveAt', function () {
            // given
            const width = 20, height = 30;

            // when
            let game = Game.new({width, height});

            // then
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    expect(game.isLiveAt({x, y})).toEqual(false);
                }
            }
        });
    });

    describe('toggleLiveAt', function () {
        it('should be able to toggle isLive by toggleLiveAt', function () {
            // given
            const width = 20, height = 30, x = 5, y = 7;
            let game = Game.new({width, height});
            expect(game.isLiveAt({x, y})).toEqual(false);

            // when
            let isLiveAfterToggle = game.toggleLiveAt({x, y});

            // then
            const expectedIsLiveAfterToggle = true;
            expect(isLiveAfterToggle).toEqual(expectedIsLiveAfterToggle);
            expect(game.isLiveAt({x, y})).toEqual(expectedIsLiveAfterToggle);
        });
    });

    describe('reset', function () {
        it('should set isLive=false for all cells after game.reset()', function () {
            // given
            const width = 20, height = 30;
            let game = Game.new({width, height});

            game.toggleLiveAt({x: 0, y: 0});
            game.toggleLiveAt({x: 1, y: 2});
            game.toggleLiveAt({x: 2, y: 2});

            // when
            game.reset();

            // then
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    expect(game.isLiveAt({x, y})).toEqual(false);
                }
            }
        });
    });
});
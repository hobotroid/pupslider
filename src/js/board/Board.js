import range from 'lodash.range';
import shuffle from 'shuffle-array';

export default class Board {
    constructor(width, height, tileWidth, tileHeight) {
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tiles = shuffle(range(width * height));

        console.log(`new board... ${this.width}x${this.height}`);
    }

    getTilePosition = (tileIndex) => ({
        x: tileIndex % this.width * this.tileWidth,
        y: Math.floor(tileIndex / this.width) * this.tileHeight
    });

    /**
     * Gets index, x, and y of the empty tile
     */
    getEmptyTile() {
        const index = this.tiles.indexOf(0);
        const pos = this.getTilePosition(index);
        return {x: pos.x, y: pos.y, index};
    }

    /**
     * Is this board currently solved? Has the player won?
     */
    isSolved() {
        if (this.tiles[this.tiles.length - 1] !== 0) {
            return false;
        }
        for (let i = 0; i < this.tiles.length - 1; i++) {
            if (this.tiles[i] !== i + 1) {
                return false;
            }
        }
        return true;
    }

    /**
     * Swaps a given tile with the adjacent empty tile, if it exists.
     * return bool whether move happened
     */
    move(tileIndex) {
        const clickedTile = this.getTilePosition(tileIndex);
        const emptyTile = this.getEmptyTile();
        console.log(`moving ${clickedTile.x}x${clickedTile.y}`);
        console.log(emptyTile);

        if((emptyTile.x == clickedTile.x || emptyTile.y == clickedTile.y) && (clickedTile.x != emptyTile.x || clickedTile.y != emptyTile.y)) {
            const tempTile = this.tiles[emptyTile.index];
            this.tiles[emptyTile.index] = this.tiles[tileIndex];
            this.tiles[tileIndex] = tempTile;
            return true;
        }

        return false;
    }
}

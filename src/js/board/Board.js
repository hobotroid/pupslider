import range from 'lodash.range';

export default class Board {
    constructor(width, height, tileWidth, tileHeight) {
        this.width = width;
        this.height = height;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.tiles = range(width * height);

        this.shuffle();

        console.log(`new board... ${this.width}x${this.height}`);
        console.log("solvable: " + this.isSolvable());
        console.log("inversions: " + this.inversionCount());
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
        return {x: pos.x, y: pos.y, index: index};
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

        if((emptyTile.x == clickedTile.x || emptyTile.y == clickedTile.y) && (clickedTile.x != emptyTile.x || clickedTile.y != emptyTile.y)) {
            this.swap(tileIndex, emptyTile.index)
            return true;
        }

        return false;
    }

    /**
     * Swap two tiles
     */
    swap(index1, index2) {
        const tempTile = this.tiles[index1];
        this.tiles[index1] = this.tiles[index2];
        this.tiles[index2] = tempTile;
    }

    /**
     * Counts numbert of inverstions in the current board. The number of
     * inversions is important because the game won't be solvable if we don't
     * have the right number of inversions relative to the board's size
     *
     * Swiped in part from http://henleyedition.com/reactjs-slide-puzzle/
     */
    inversionCount() {
        //make array of # of inversions per tile
        var invArray = this.tiles.map((num, i) => {
            var inversions = 0;
            for (let j = i + 1; j < this.tiles.length; j++) {
                if (this.tiles[j] != 0 && this.tiles[j] < num) {
                    inversions++;
                }
            }
            return inversions;
        });

        //sum up all inversions and return total
        return invArray.reduce(function(a, b) {
            return a + b;
        });
    }

    /**
     * fischer-yates shuffle algorithm
     *
     * Swiped in part from http://henleyedition.com/reactjs-slide-puzzle/
     */
    fischerYates() {
        let tiles = this.tiles;
        let counter = tiles.length;
        let temp = null;
        let index = 0;

        // While there are elements in the array
        while(counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = tiles[counter];
            tiles[counter] = tiles[index];
            tiles[index] = temp;
        }

        return tiles;
    }

    shuffle() {
        this.tiles = this.fischerYates(this.tiles);

        if (this.inversionCount() % 2 !== 0) {
            // if odd, swap first two (non-empty) tiles
            var i = 0;
            while (this.tiles[i] == 0 || this.tiles[i+1] == 0) i++;
            console.log("ut oh, swapping " + i + " and " + (i+1));
            this.swap(i, i+1);
        }
    }

    isSolvable() {
        let zeroIndex = this.tiles.indexOf(0);
        let zeroLoc = this.width - Math.floor(zeroIndex / this.width);
        let inversions = this.inversionCount();

        if (this.width % 2 === 1) {
            return inversions % 2 === 0;
        }
        return zeroLoc % 2 === 1 ? inversions % 2 === 0 : inversions % 2 === 1;
    }
}

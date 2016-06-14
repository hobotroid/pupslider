import React from "react";

import Board from "./../board/Board";
import BoardLayout from "./BoardLayout";

export default class GameLayout extends React.Component {
    constructor() {
        super();

        const gameWidth = 520;
        const gameHeight = 520;
        const w = 3;
        const h = 3;
        this.state = {
            board: new Board(w, h, gameWidth / w, gameHeight / h) // TODO: un-hardcode these widths and heights
        };

        this.handleMouseClick = this.tileClicked.bind(this);
    }

    tileClicked(tileIndex) {
        console.log(`clicked ${tileIndex}`);
        console.log(this.state.board.tiles);
        this.state.board.move(tileIndex);
        this.setState({
            board: this.state.board
        });
        if(this.state.board.isSolved()) {
            alert("con g's");
        }
        console.log(this.state.board.tiles);
    }

    render() {
        return (
            <div id="gameScreen">
                <img id="titleImage" src="title.png" />
                <BoardLayout
                    board={this.state.board}
                    onMouseClick={this.handleMouseClick}
                    puppyUrl={this.props.puppyUrl} />
            </div>
        );
    }
}

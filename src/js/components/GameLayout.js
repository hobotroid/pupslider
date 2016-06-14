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

        this.gameStartTime = Date.now();
        this.gameTimer = setInterval(this.tick.bind(this), 1000);
        this.handleMouseClick = this.tileClicked.bind(this);

        this.state = {
            board: new Board(w, h, gameWidth / w, gameHeight / h),
            moveCount: 0,
            gameTime: 0
        };
    }

    pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    componentWillUnmount() {
        clearInterval(this.gameTimer);
    }

    tick() {
        this.setState({
            gameTime: Math.floor((Date.now() - this.gameStartTime) / 1000)
        });
    }

    tileClicked(tileIndex) {
        console.log(`clicked ${tileIndex}`);
        console.log(this.state.board.tiles);
        if(this.state.board.move(tileIndex)) {
            this.setState({
                board: this.state.board,
                moveCount: this.state.moveCount + 1
            });
            if(this.state.board.isSolved()) {
                alert("con g's");
            }
            console.log(this.state.board.tiles);
        }
    }

    giveUp() {

    }

    solve() {

    }

    showScores() {

    }

    render() {
        const moveCount = this.pad(this.state.moveCount, 3);
        const minutes = this.pad(Math.floor(this.state.gameTime / 60), 2);
        const seconds = this.pad(this.state.gameTime - parseInt(minutes) * 60, 2);


        return (
            <div id="gameScreen">
                <img id="titleImage" src="title.png" onClick={this.props.endGame} />
                <BoardLayout
                    board={this.state.board}
                    onMouseClick={this.handleMouseClick}
                    puppyUrl={this.props.puppyUrl} />

                <div class="clearfix buttons gameInfo">
                    <div style={{float:'left'}}>PUPSLIDES: <span class="gameMoves">{moveCount}</span></div>
                    <div style={{float:'right'}}><span class="gameTimer">{minutes}:{seconds}</span></div>
                </div>
            </div>
        );
        /*
        <button class="btn btn-default" onClick={this.giveUp.bind(this)}>Give Up</button>
        <button onClick={this.solve.bind(this)}>Solve</button>
        <button onClick={this.showScores.bind(this)}>Scores</button>
        */
    }
}

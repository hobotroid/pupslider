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

        // API lives in same process as web server for the purposes of this demo
        this.apiUrl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+"/api";

        this.state = {
            board: new Board(w, h, gameWidth / w, gameHeight / h),
            moveCount: 0,
            gameTime: 0,
            togglingScores: false,
            won: false
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
        if(this.state.board.move(tileIndex)) {
            this.setState({
                board: this.state.board,
                moveCount: this.state.moveCount + 1,
                won: this.state.board.isSolved()
            });
        }
    }

    giveUp() {

    }

    /**
     * Show/hide the high scores panel. This should be borken out into
     * its own react component, but it's okay here for now.
     */
    toggleScores() {
        $(".scoresButton").blur();

        if(!this.state.togglingScores) {
            this.state.togglingScores = true;
            if($("#scoreBoard").is(":visible")) {
                $("#scoreBoard").animate({
                    opacity: 0
                }, 500, () => {
                    $("#scoreBoard").hide();
                    this.state.togglingScores = false;
                });
            } else {
                $.get(this.apiUrl + "/scores", (results) => {
                    //scores by time
                    var listElement = $('<ul class="list">');
                    $("#scoreBoard").html('');
                    listElement.append('<li style="font-size:22px;text-decoration:underline">Time</li>')
                    results.byTime.map((row) => {
                        const {minutes, seconds} = this.formatTime(row.time);
                        listElement.append(`<li><span class="name">${row.name}</span> <span class="value">${minutes}:${seconds}</span></li>`);
                    })
                    listElement.appendTo("#scoreBoard");

                    //scores by moves
                    var listElement = $('<ul class="list">').css({float: 'right'});
                    listElement.append('<li style="font-size:22px;text-decoration:underline">Moves</li>')
                    results.byMoves.map((row) => {
                        listElement.append(`<li><span class="name">${row.name}</span> <span class="value">${row.moves}</span></li>`);
                    })
                    listElement.appendTo("#scoreBoard");

                    $("#scoreBoard").show().animate({
                        opacity: 1
                    }, 500, () => {
                        this.state.togglingScores = false;
                    });
                })

            }
        }
    }

    hideScores() {

    }

    formatTime(seconds) {
        let minutes = this.pad(Math.floor(seconds / 60), 2);
        return {
            minutes: minutes,
            seconds: this.pad(seconds - parseInt(minutes) * 60, 2)
        };
    }

    render() {
        const moveCount = this.state.moveCount;
        const { minutes, seconds } = this.formatTime(this.state.gameTime);

        if(this.state.won) {
            clearInterval(this.gameTimer);
            let name = prompt("Congrats! What's your name?");
            if(name) {
                $.post(this.apiUrl + "/scores",
                    {name: name, time: this.state.gameTime, moves: this.state.moveCount},
                    () => {
                        this.toggleScores();
                    }
                )
            } else {
                this.toggleScores();
            }
        }

        return (
            <div id="gameScreen">
                <img id="titleImage" src="title2.png" onClick={this.props.endGame} />
                <BoardLayout
                    board={this.state.board}
                    onMouseClick={this.handleMouseClick}
                    puppyUrl={this.props.puppyUrl} />

                <ul id="scoreBoard">
                    <li>blah</li>
                </ul>

                <div class="clearfix buttons gameInfo">
                    <div style={{float:'left'}}>PUPSLIDES: <span class="gameMoves">{moveCount}</span></div>
                    <button class="btn btn-default scoresButton" style={{float:'right', marginLeft: '10px'}} onClick={this.toggleScores.bind(this)}>Scores</button>
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

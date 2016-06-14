import React from "react";

import GameLayout from "./GameLayout";
import TitleLayout from "./TitleLayout";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            stage: "title"
        }
    }

    restart() {

    }

    startGame(puppyUrl) {
        this.setState({
            puppyUrl: puppyUrl,
            stage: "game"
        });
    }

    endGame() {
        if(confirm("Are you sure you want to end your current game?")) {
            this.setState({
                stage: "title"
            });
        }
    }

    render() {
        if(this.state.stage == "title") {           // Title screen
            return <TitleLayout
                startGame={this.startGame.bind(this)} />;
        } else if (this.state.stage == "game") {    // Game screen
            return <GameLayout
                endGame={this.endGame.bind(this)}
                puppyUrl={this.state.puppyUrl} />;
        } else {                                    // Game Over screen
            return <GameLayout />;
        }

    }
}

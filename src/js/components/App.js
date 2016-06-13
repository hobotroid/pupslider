import React from "react";

import Board from "./../board/Board";
import BoardLayout from "./BoardLayout";
import GoogleImage from "./../images/GoogleImage.js";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            board: new Board(5, 5, 100, 100) // TODO: un-hardcode these widths and heights
        };

        this.handleMouseClick = this.tileClicked.bind(this);

        //get images - temp
        let googleImage = new GoogleImage();
        googleImage.get("puppy", 5);
    }

    tileClicked(tileIndex) {
        console.log(`clicked ${tileIndex}`);
        console.log(this.state.board.tiles);
        this.state.board.move(tileIndex);
        this.setState({
            board: this.state.board
        });
        console.log(this.state.board.tiles);
    }

    render() {
        return (
            <div>
                <BoardLayout
                    board={this.state.board}
                    onMouseClick={this.handleMouseClick} />
            </div>
        );
    }
}


/*
import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        <Footer />
      </div>
    );
  }
}
*/

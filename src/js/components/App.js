import React from "react";

import BoardLayout from "./BoardLayout";

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            width: 5,
            height: 5,
            tileWidth: 100,
            tileHeight: 100
        };
    }

    tileClicked(tileIndex) {
        console.log("clicked {tileIndex}");
    }

    render() {
        return (
            <div>
                <BoardLayout
                    width={this.state.width}
                    height={this.state.height}
                    tileWidth={this.state.tileWidth}
                    tileHeight={this.state.tileHeight} />
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

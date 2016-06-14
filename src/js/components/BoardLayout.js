import React from 'react';
import { Motion, spring } from 'react-motion';

import Board from "./../board/Board";

const springConfig = {stiffness: 300, damping: 50};

class BoardLayout extends React.Component {
    handleTouchStart(key, pressLocation, e) {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    }

    handleMouseDown(pos, pressY, {pageY}) {
/*
        this.setState({
            delta: pageY - pressY,
            mouse: pressY,
            isPressed: true,
            lastPressed: pos
        });
        */
    }

    render() {
        let board = this.props.board;
        return (<div id="gameBoard">
            {board.tiles.map((tileValue, tileIndex) => {
                let { x, y } = board.getTilePosition(tileIndex);
                let originalPos = board.getTilePosition(tileValue);
                const className = "tile " + (tileValue == 0 ? "emptyTile" : "normalTile");
                const style = {
                    //scale: spring(1, springConfig),
                    //shadow: spring(1, springConfig),
                    //y: spring(tileIndex * 100, springConfig),
                    tX: spring(x),
                    tY: spring(y)
                };
                return (
                    <Motion key={tileIndex} defaultStyle={{x: 0}} style={style}>
                        {(value) =>
                            <div
                                className={className}
                                style={{
                                    width: `${board.tileWidth}px`,
                                    height: `${board.tileHeight}px`,
                                    transform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
                                    WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
                                    background: `url(${this.props.puppyUrl}) no-repeat top left`,
                                    backgroundPosition: `-${originalPos.x}px -${originalPos.y}px`
                                }}
                                onClick={this.props.onMouseClick.bind(null, tileIndex)}>
                            </div>
                        }
                    </Motion>
                );
            })}
        </div>);
    }

};

export default BoardLayout;

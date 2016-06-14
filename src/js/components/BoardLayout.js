import React from 'react';
import { Motion, spring } from 'react-motion';

import Board from "./../board/Board";

/**
 * BoardLayout Component
 * Handles the layout of the actual tiles.
 */
class BoardLayout extends React.Component {
    render() {
        let board = this.props.board;
        return (<div id="gameBoard">
            {board.tiles.map((tileValue, tileIndex) => {
                let { x, y } = board.getTilePosition(tileIndex);
                let originalPos = board.getTilePosition(tileValue - 1);
                const className = "tile " + (tileValue == 0 ? "emptyTile" : "normalTile");
                const style = {
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
                                <span className="tileValue">{tileValue}</span>
                            </div>
                        }
                    </Motion>
                );
            })}
        </div>);
    }

};

export default BoardLayout;

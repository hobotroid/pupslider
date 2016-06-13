import React from 'react';
import { Motion, spring } from 'react-motion';

import Board from "./../board/Board";

const springConfig = {stiffness: 300, damping: 50};

class BoardLayout extends React.Component {
    handleTouchStart(key, pressLocation, e) {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    }

    handleMouseDown(pos, pressY, {pageY}) {
        this.setState({
            delta: pageY - pressY,
            mouse: pressY,
            isPressed: true,
            lastPressed: pos
        });
    }

    render() {
        let board = this.props.board;
        return (<div>
            {board.tiles.map((tileValue, tileIndex) => {
                let { x, y } = board.getTilePosition(tileIndex);
                const style = {
                    //scale: spring(1, springConfig),
                    //shadow: spring(1, springConfig),
                    //y: spring(tileIndex * 100, springConfig),
                    tX: spring(x),
                    tY: spring(y)
                };
                const className = tileValue == 0 ? "emptyTile" : "normalTile";
                return (
                    <Motion key={tileIndex} defaultStyle={{x: 0}} style={style}>
                        { (value) =>
                            <div
                                className={className}
                                style={{
                                    width: `${board.tileWidth}px`,
                                    height: `${board.tileHeight}px`,
                                    position: `absolute`,
                                    textAlign: `center`,
                                    transform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
                                    WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(1)`
                                }}
                                onClick={this.props.onMouseClick.bind(null, tileIndex)}>
                                {tileValue}
                            </div>
                        }
                    </Motion>
                );
            })}
        </div>);
    }

};

export default BoardLayout;

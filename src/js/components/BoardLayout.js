import React from 'react';
import { Motion, spring } from 'react-motion';
import range from 'lodash.range';

import Board from "./../board/Board";

const springConfig = {stiffness: 300, damping: 50};

const getTilePosition = (tileIndex, props) => ({
    x: tileIndex % props.width * props.tileWidth,
    y: Math.floor(tileIndex / props.width) * props.tileHeight
});

const BoardLayout = React.createClass({
    getInitialState() {
        return {
            delta: 0,
            mouse: 0,
            isPressed: false,
            lastPressed: 0,
            order: range(itemsCount)
        };
    },

    handleTouchStart(key, pressLocation, e) {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    },

    handleMouseDown(pos, pressY, {pageY}) {
        this.setState({
            delta: pageY - pressY,
            mouse: pressY,
            isPressed: true,
            lastPressed: pos
        });
    },

    render() {
        return (
            <div>
                {range(props.width*props.height).map(tileIndex => {
                    let { x, y } = getTilePosition(tileIndex, props);
                    const style = {
                        //scale: spring(1, springConfig),
                        //shadow: spring(1, springConfig),
                        //y: spring(tileIndex * 100, springConfig),
                        tX: spring(x),
                        tY: spring(y)
                    };
                    const className = tileIndex == 0 ? "emptyTile" : "normalTile";
                    return (
                        <Motion key={tileIndex} defaultStyle={{x: 0}} style={style}>
                            { (value) =>
                                <div
                                    className={className}
                                    style={{
                                        width: `${props.tileWidth}px`,
                                        height: `${props.tileHeight}px`,
                                        position: `absolute`,
                                        textAlign: `center`,
                                        transform: `translate3d(${x}px, ${y}px, 0) scale(1)`,
                                        WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(1)`

                                    }}>
                                    {tileIndex}
                                </div>
                            }
                        </Motion>
                    );
                })}
            </div>
        );
    }

});

export default BoardLayout;

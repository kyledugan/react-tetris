import React from 'react';
import classes from './BlockPiece.module.css';

const BlockPiece = props => {
    const width = props.size * 0.9,
        height = props.size * 0.9,
        margin = props.size * 0.05;

    return ( 
        <div 
            className={[classes.BlockPiece, classes[props.shape]].join(' ')} 
            style={{
                top: props.top*props.size, 
                left: props.left*props.size,
                width: width,
                height: height,
                margin: margin
            }} 
        />
    );
};

export default BlockPiece;
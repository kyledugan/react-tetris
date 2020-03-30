import React from 'react';
import SubBlock from './SubBlock';
import classes from './Block.module.css';

const Block = props => {
    switch (props.shape) {
        case 'I':
            if (props.rotation % 4 === 0 || props.rotation % 4 === 2) {
                return (
                    <div className={classes.IBlock}>
                        <SubBlock top={props.top-2} left={props.left} />
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top-1} left={props.left} />
                        <SubBlock top={props.top+1} left={props.left} />
                    </div>
                );
            } else {
                return (
                    <div className={classes.IBlock}>
                        <SubBlock top={props.top} left={props.left-1} />
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top} left={props.left+1} />
                        <SubBlock top={props.top} left={props.left+2} />
                    </div>
                );
            }
        case 'L':
            if (props.rotation % 4 === 0) {
                return (
                    <div className={classes.IBlock}>
                        <SubBlock top={props.top-1} left={props.left} />
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top+1} left={props.left} />
                        <SubBlock top={props.top+1} left={props.left+1} />
                    </div>
                );
            } else if (props.rotation % 4 === 1) {
                return (
                    <div className={classes.IBlock}>
                        <SubBlock top={props.top} left={props.left-1} />
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top} left={props.left+1} />
                        <SubBlock top={props.top-1} left={props.left+1} />
                    </div>
                );
            } else if (props.rotation % 4 === 2) {
                return (
                    <div className={classes.IBlock}>
                        <SubBlock top={props.top-1} left={props.left-1} />
                        <SubBlock top={props.top-1} left={props.left} />
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top+1} left={props.left} />
                    </div>
                );
            } else {
                return (
                    <div className={classes.IBlock}>
                        <SubBlock top={props.top} left={props.left-1} />
                        <SubBlock top={props.top+1} left={props.left-1} />
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top} left={props.left+1} />
                    </div>
                );
            } 
        case 'Square':
            return (
                <div className={classes.SquareBlock}>
                    <SubBlock top={props.top} left={props.left} />
                    <SubBlock top={props.top+1} left={props.left} />
                    <SubBlock top={props.top+1} left={props.left+1} />
                    <SubBlock top={props.top} left={props.left+1} />
                </div>
            );
        case 'S':
            if (props.rotation % 2 === 0) {
                return (
                    <div className={classes.SBlock}>
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top+1} left={props.left} />
                        <SubBlock top={props.top} left={props.left+1} />
                        <SubBlock top={props.top+1} left={props.left-1} />
                    </div>
                    
                );
            } else {
                return (
                    <div className={classes.SBlock}>
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top-1} left={props.left} />
                        <SubBlock top={props.top} left={props.left+1} />
                        <SubBlock top={props.top+1} left={props.left+1} />
                    </div>
                );
            };
        case 'T':
            if (props.rotation % 4 === 0) {
                return (
                    <div className={classes.TBlock}>
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top} left={props.left-1} />
                        <SubBlock top={props.top} left={props.left+1} />
                        <SubBlock top={props.top+1} left={props.left} />
                    </div>
                );
            } else if (props.rotation % 4 === 1) {
                return (
                    <div className={classes.TBlock}>
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top-1} left={props.left} />
                        <SubBlock top={props.top} left={props.left+1} />
                        <SubBlock top={props.top+1} left={props.left} />
                    </div>
                );
            } else if (props.rotation % 4 === 2) {
                return (
                    <div className={classes.TBlock}>
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top-1} left={props.left} />
                        <SubBlock top={props.top} left={props.left+1} />
                        <SubBlock top={props.top} left={props.left-1} />
                    </div>
                );
            } else {
                return (
                    <div className={classes.TBlock}>
                        <SubBlock top={props.top} left={props.left} />
                        <SubBlock top={props.top+1} left={props.left} />
                        <SubBlock top={props.top} left={props.left-1} />
                        <SubBlock top={props.top-1} left={props.left} />
                    </div>
                );
            } 
        default:
            return null;
    }

}

export default Block;
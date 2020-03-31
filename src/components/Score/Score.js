import React from 'react';
import classes from './Score.module.css';

const Score = props => {
    return (
        <div className={classes.Score}>
            <strong>{props.score}</strong>
        </div>
    );
}

export default Score;
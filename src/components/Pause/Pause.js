import React from 'react';
import Button from '../../UI/Button/Button';
import classes from './Pause.module.css';

const Pause = props => {
    return (
        <div className={classes.Pause} style={{display: props.show ? 'block' : 'none'}}>
            <h1>T E T R I S</h1>
            <h2>Paused</h2>
            <Button type='Play' clicked={props.resume}>RESUME</Button>
        </div>
    );
}

export default Pause;
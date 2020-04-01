import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareUp, faCaretSquareDown, faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import Button from '../../UI/Button/Button';
import classes from './Instructions.module.css';
import spacebarLogo from '../../assets/space-bar-png-16.png'

const Instructions = props => {
    return (
        <div style={{display: props.show ? 'block' : 'none'}} className={classes.Instructions}>
            <h1>T E T R I S</h1>
            <div className={classes.Instruction}>
                <FontAwesomeIcon className={classes.Icon} icon={faCaretSquareUp} />
                <p>Rotate</p>
            </div>
            <div className={classes.Instruction}>
                <FontAwesomeIcon className={classes.Icon} icon={faCaretSquareLeft} />
                <p>Move left</p>
            </div>
            <div className={classes.Instruction}>
                <FontAwesomeIcon className={classes.Icon} icon={faCaretSquareRight} />
                <p>Move right</p>
            </div>
            <div className={classes.Instruction}>
                <FontAwesomeIcon className={classes.Icon} icon={faCaretSquareDown} />
                <p>Move down</p>
            </div>
            <div className={classes.Instruction}>
                <img src={spacebarLogo} alt='spacebar'></img>
                <p>Move to bottom</p>
            </div>
            <Button clicked={props.play} type='Play'>PLAY</Button>
        </div>
    );
}

export default Instructions;
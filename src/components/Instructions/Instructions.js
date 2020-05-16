import React, {Fragment} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareUp, faCaretSquareDown, faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import { faArrowLeft, faArrowRight, faArrowDown, faSync } from '@fortawesome/free-solid-svg-icons';
import Button from '../../UI/Button/Button';
import classes from './Instructions.module.css';
import spacebarLogo from '../../assets/space-bar-png-16.png'
import pLogo from '../../assets/p-key.png';

let instructions;
if ('ontouchstart' in window) { // touchscreen instructions
    instructions = (
        <Fragment>
            <h1>T E T R I S</h1>
            <div className={classes.TouchInstructions} style={{height: window.innerHeight * 0.7}}>
                <div style={{width: '24%', borderRight: '1px solid gray'}}>
                    Tap / Swipe
                    <br/>
                    <FontAwesomeIcon className={classes.Icon} icon={faArrowLeft} />
                    <br/>
                    Move Left
                </div>
                
                <div style={{width: '50%'}}>
                    Tap
                    <br/>
                    <FontAwesomeIcon className={classes.Icon} icon={faSync} />
                    <br/>
                    Rotate
                </div>
                <div style={{width: '24%', borderLeft: '1px solid gray'}}>
                    Tap / Swipe
                    <br/>
                    <FontAwesomeIcon className={classes.Icon} icon={faArrowRight} />
                    <br/>
                    Move Right
                </div>
                <div style={{width: '100%'}}>
                    Swipe
                    <br/>
                    <FontAwesomeIcon className={classes.Icon} icon={faArrowDown} />
                    <br/>
                    Move to Bottom
                </div>
            </div>
        </Fragment>
    );
} else { // keyboard instructions
    instructions = (
        <Fragment>
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
                <img src={spacebarLogo} alt='Spacebar Key'></img>
                <p>Move to bottom</p>
            </div>
            <div className={classes.Instruction}>
                <img src={pLogo} alt='P Key'></img>
                <p>Pause</p>
            </div>
        </Fragment>
    );
}

const Instructions = props => {
    return (
        <div style={{display: props.show ? 'block' : 'none'}} className={classes.Instructions}>
            { instructions }
            <Button clicked={props.play} type='Play'>PLAY</Button>
        </div>
    )
}

export default Instructions;
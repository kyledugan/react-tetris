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
            <div className={classes.TouchInstructions} style={{height: window.innerHeight * 0.7}}>
                <div style={{width: '24%', borderRight: '1px solid gray'}}>
                    <p>Tap / Swipe</p>
                    <FontAwesomeIcon className={classes.Icon} icon={faArrowLeft} />
                    <p>Move Left</p>
                </div>
                <div style={{width: '50%'}}>
                    <p>Tap</p>
                    <FontAwesomeIcon className={classes.Icon} icon={faSync} />
                    <p>Rotate</p>
                </div>
                <div style={{width: '24%', borderLeft: '1px solid gray'}}>
                    <p>Tap / Swipe</p>
                    <FontAwesomeIcon className={classes.Icon} icon={faArrowRight} />
                    <br/>
                    <p>Move Right</p>
                </div>
                <div style={{width: '100%'}}>
                    <p>Swipe</p>
                    <FontAwesomeIcon className={classes.Icon} icon={faArrowDown} />
                    <p>Move to bottom</p>
                </div>
            </div>
        </Fragment>
    );
} else { // keyboard instructions
    instructions = (
        <Fragment>
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
            <h1>T E T R I S</h1>
            <Button className={classes.PlayButton} clicked={props.play} type='Play'>PLAY</Button>
            { instructions }
        </div>
    )
}

export default Instructions;
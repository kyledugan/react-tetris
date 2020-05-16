import React, { Fragment, useState, useEffect, useMemo } from 'react';
import Button from '../../UI/Button/Button';
import classes from './HighScores.module.css';
import axios from 'axios';

const HighScores = props => {
    const [scores, setScores] = useState({});
    const [name, setName] = useState('');
    const [scoreSaved, setScoreSaved] = useState(false);
    const [shouldValidate, setShouldValidate] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({type: ''});

    const getScores = async () => {
        await axios.get('https://tetris-dd21a.firebaseio.com/scores.json')
            .then(res => {
                if (res.status === 200) {
                    setScores(res.data);
                }
            }).catch(err => {
                setError({type: 'get', message: err.message});
            })
    }

    useEffect(() => {
        getScores();
    }, [])

    let sortedScores = [];
    for (let score in scores) {
        sortedScores.push([scores[score].name, scores[score].score])
    }
    if (!scoreSaved) {
        sortedScores.push(['', props.score])
    }
    
    sortedScores.sort((a, b) => {
        return b[1] - a[1];
    })

    let scoreList = useMemo(() => {
        setShowSaveButton(false);
        return sortedScores.map((score, i) => {
            const inputStyle = shouldValidate && name.trim().length === 0 ? {outline: '2px solid red'} : {outline: 'none'};
            if (i < 10) {
                if (score[0] === '') {
                    setShowSaveButton(true);
                    return <li className={classes.Outline} key={i}>{i+1}. <input style={inputStyle} className={classes.Input} placeholder="Name" value={name} onChange={event => nameChangedHandler(event)}></input> <span className={classes.Points}>{score[1]}</span></li>
                } else {
                    return <li key={i}>{i+1}. {score[0]} <span className={classes.Points}>{score[1]}</span></li>;
                }
            } else {
                return null;
            }
    })}, [scores, props.score, name, shouldValidate]); //eslint-disable-line

    const nameChangedHandler = event => {
        if (event.target.value.length < 15) {
            setName(event.target.value);
        }
    }

    const keyUpHandler = event => {
        event.preventDefault();
    }

    // KEY LISTENER
    useEffect(() => {
        document.addEventListener('keyup', keyUpHandler)
        return () => document.removeEventListener('keyup', keyUpHandler);
    }, [])

    const saveScore = async () => {
        if (name.trim().length === 0) {
            setShouldValidate(true);
        } else {
            setLoading(true);
            const data = {'name': name, 'score': props.score};
            await axios.post('https://tetris-dd21a.firebaseio.com/scores.json', data)
                .then(res => {
                    if (res.status === 200) {
                        setScoreSaved(true);
                        setLoading(false);
                    }
                }).catch(err => {
                    setLoading(false);
                    setError({type: 'post', message: err.message});
                });
        }
    }

    const reset = () => {
        setScores({});
        setName('');
        setScoreSaved(false);
        setShouldValidate(false);
        getScores();
        setShowSaveButton(false);
        props.playAgain();
    }

    const saveButton = showSaveButton ? (
        <Button 
            disabled={scoreSaved || loading} 
            clicked={saveScore} 
            type="Save">
                {scoreSaved ? 'SAVED' : 'SAVE SCORE'}
        </Button>
    ) : null;

    return (
        <div style={{display: props.show ? 'block' : 'none'}} className={classes.HighScores}>
            <h1>T E T R I S</h1>
            <h2 className={classes.YourScore}>Score: {props.score}</h2>
            
            {error.type === 'get' ? <p>Unable to load high scores. {error.message}.</p> : (
                <Fragment>
                    <h1 className={classes.Title}>High Scores</h1>
                    
                    <ul className={classes.Scores}>
                        {scoreList}
                    </ul>
                </Fragment>
            )}

            {error.type === 'post' ? <p>Unable to save score. {error.message}.</p> : null}
            
            {error.type !== 'get' ? saveButton : null}
            <Button clicked={() => {
                if (!scoreSaved) {
                    if (!name.trim().length) {
                        setName('???');
                    }
                    saveScore();
                }
                reset();
                }} type="Play">PLAY AGAIN</Button>
        </div>
    );
}

export default HighScores;
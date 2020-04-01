import React, { useState, useEffect, useMemo } from 'react';
import Button from '../../UI/Button/Button';
import classes from './HighScores.module.css';
import axios from 'axios';

const HighScores = props => {
    const [scores, setScores] = useState({});
    const [name, setName] = useState('');
    const [scoreSaved, setScoreSaved] = useState(false);
    const [shouldValidate, setShouldValidate] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    const getScores = async () => {
        console.log('getting')
        const res = await axios.get('https://tetris-dd21a.firebaseio.com/scores.json')
        setScores(res.data);
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
                    return <li key={i}>{i+1}. <input style={inputStyle} className={classes.Input} placeholder="Name" value={name} onChange={event => nameChangedHandler(event)}></input> <span className={classes.Points}>{score[1]}</span></li>
                } else {
                    return <li key={i}>{i+1}. {score[0]} <span className={classes.Points}>{score[1]}</span></li>;
                }
            } else {
                return null;
            }
    })}, [scores, props.score, name, shouldValidate]); //eslint-disable-line

    const nameChangedHandler = event => {
        event.preventDefault();
        setName(event.target.value);
    }

    const saveScore = async () => {
        if (name.trim().length === 0) {
            setShouldValidate(true);
        } else {
            const data = {'name': name, 'score': props.score};
            const res = await axios.post('https://tetris-dd21a.firebaseio.com/scores.json', data);
            if (res.status === 200) {
                setScoreSaved(true);
            }
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
            disabled={scoreSaved} 
            clicked={saveScore} 
            type="Save">
                {scoreSaved ? 'SAVED' : 'SAVE SCORE'}
        </Button>
    ) : null;

    return (
        <div className={classes.HighScores}>
            <h2 className={classes.YourScore}>Score: {props.score}</h2>
            <h1 className={classes.Title}>High Scores</h1>
            
            <ul className={classes.Scores}>
                {scoreList}
            </ul>
            
            {saveButton}
            <Button clicked={reset} type="PlayAgain">PLAY AGAIN</Button>
        </div>
    );
}

export default HighScores;
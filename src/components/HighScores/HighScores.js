import React, { useState, useEffect } from 'react';
import classes from './HighScores.module.css';
import axios from 'axios';

const HighScores = props => {
    const [scores, setScores] = useState({});

    useEffect(() => {
        const getScores = async () => {
            const res = await axios.get('https://tetris-dd21a.firebaseio.com/scores.json')
            setScores(res.data);
        }
        getScores();
    }, [])

    let sortedScores = [];
    for (let name in scores) {
        sortedScores.push([name, scores[name]])
    }
    sortedScores.sort((a, b) => {
        return b[1] - a[1];
    })

    let scoreList = sortedScores.map((score, i) => {
        return <li key={i}>{i+1}. {score[0]} {score[1]}</li>;
    })

    return (
        <div className={classes.HighScores}>
            <h1 className={classes.Title}>High Scores</h1>
            <ul className={classes.Scores}>
                {scoreList}
            </ul>
            
        </div>
    );
}

export default HighScores;
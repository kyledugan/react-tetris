import React, { useState, useEffect, useMemo } from 'react';
import Block from '../components/Blocks/Block';
import BlockPiece from '../components/Blocks/BlockPiece';
import Score from '../components/Score/Score';
import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';
import Instructions from '../components/Instructions/Instructions'
import HighScores from './HighScores/HighScores';
import Pause from '../components/Pause/Pause';

const Gameboard = () => {
    const height = 20;
    const pieceSize = Math.floor(window.innerHeight/height);
    const width = Math.min(height, Math.floor(window.innerWidth/pieceSize));
    const midPoint = Math.floor(width/2) - 1;
    const blockTypes = ['I', 'T', 'S', 'Square', 'L'];

    const [position, setPosition] = useState([midPoint, 0, 0]) //x, y, rotation
    const [shape, setShape] = useState();
    const [restingBlocks, setRestingBlocks] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [tickPeriod, setTickPeriod] = useState(1000);
    const [score, setScore] = useState(0);
    const [paused, setPaused] = useState(false);
    const [swipeStart, setSwipeStart] = useState([]);

    const checkCollision = (nextCoords) => {
        for (const block of nextCoords) {
            // prevent moving off the side of the screen
            if (block[0] < 0 || block[0]+1 > width) {
                return true;
            }
            // prevent moving into an existing block
            for (const rBlock of restingBlocks) {
                if (block[0] === rBlock.x && block[1] === rBlock.y) {
                    return true;
                }
            }
        }
    }

    const getCoords = (xOffset, yOffset, rotation) => {
        const newX = position[0] + xOffset;
        const newY = position[1] + yOffset;
        const newR = position[2] + rotation;
        switch (shape) {
            case 'I':
                if (newR % 2 === 0) {
                    return [[newX, newY-2], [newX, newY-1], [newX, newY], [newX, newY+1]];
                } else {
                    return [[newX-1, newY], [newX, newY], [newX+1, newY], [newX+2, newY]]
                }
            case 'T': 
                if (newR % 4 === 0) {
                    return [[newX, newY], [newX-1, newY], [newX+1, newY], [newX, newY+1]];
                } else if (newR % 4 === 1) {
                    return [[newX, newY], [newX, newY-1], [newX+1, newY], [newX, newY+1]];
                } else if (newR % 4 === 2) {
                    return [[newX, newY], [newX, newY-1], [newX+1, newY], [newX-1, newY]];
                } else {
                    return [[newX, newY], [newX, newY+1], [newX-1, newY], [newX, newY-1]];
                }
            case 'L':
                if (newR % 4 === 0) {
                    return [[newX, newY-1], [newX, newY], [newX, newY+1], [newX+1, newY+1]];
                } else if (newR % 4 === 1) {
                    return [[newX-1, newY], [newX, newY], [newX+1, newY], [newX+1, newY-1]];
                } else if (newR % 4 === 2) {
                    return [[newX-1, newY-1], [newX, newY-1], [newX, newY], [newX, newY+1]];
                } else {
                    return [[newX-1, newY], [newX-1, newY+1], [newX, newY], [newX+1, newY]];
                }
            case 'Square':
                return [[newX, newY], [newX, newY+1], [newX+1, newY+1], [newX+1, newY]];
            case 'S':
                if (newR % 2 === 0) {
                    return [[newX, newY], [newX, newY+1], [newX+1, newY], [newX-1, newY+1]];
                } else {
                    return [[newX, newY], [newX, newY-1], [newX+1, newY], [newX+1, newY+1]];
                }
            default:
                break;
        }
    }

    const moveBlock = (nextCoords, x, y, r) => {
        if (!checkCollision(nextCoords)) {
            setPosition(position => [position[0] + x, position[1] + y, position[2] + r])
        }
    }

    const rotateBlock = () => {
        const nextCoords = getCoords(0, 0, 1);

        let minX = [width, 0];
        let maxX = [0, 0];
        for (const block of nextCoords) {
            if (block[0] < minX[0]) {
                minX[0] = block[0]
            } else if (block[0] > maxX[0]) {
                maxX[0] = block[0]
            }
        }

        if (minX[0] < 0) {
            moveBlock(getCoords(-minX[0], 0, 1), -minX[0], 0, 1)
        } else if (maxX[0] >= width) {
            moveBlock(getCoords(-(maxX[0]-width+1, 1), 0), -(maxX[0]-width+1), 0, 1)
        } else {
            moveBlock(nextCoords, 0, 0, 1)
        }
    }

    const moveToBottom = () => {
        const coords = getCoords(0, 0, 0);
        let distance = height;
        for (let block of coords) {
            let distToBottom = height - block[1] - 1;
            if (restingBlocks.length) {
                for (const rBlock of restingBlocks) {
                    if (rBlock.x === block[0] && rBlock.y >= block[1]) {
                        if (rBlock.y - block[1] - 1 < distToBottom) {
                            distToBottom = rBlock.y - block[1] - 1
                        }
                    }
                }
            } else {
                distToBottom = height - block[1] - 1;
            }
            if (distToBottom < distance) {
                distance = distToBottom;
            }
        }
        moveBlock(getCoords(0, distance, 0), 0, distance, 0);
    }

    const keyDownHandler = event => {
        event.preventDefault();
        if (!paused && gameStarted) {
            switch(event.keyCode) {
                case 40: //down
                    moveBlock(getCoords(0, 1, 0), 0, 1, 0);
                    break;
                case 38: //up
                    rotateBlock();
                    break;
                case 37: //left
                    moveBlock(getCoords(-1, 0, 0), -1, 0, 0);
                    break;
                case 39: //right
                    moveBlock(getCoords(1, 0, 0), 1, 0, 0);
                    break;
                case 32: //space
                    moveToBottom();
                    break;
                default:
                    break;
            }
        }
        if (event.keyCode === 80) {
            setPaused(paused => !paused);
        }
    }

    const touchHandler = (x0, y0, dx, dy) => {
        if (dx === 0 && dy === 0) {
            if (x0 < window.innerWidth * .25 && y0 > 80) { // left quarter of screen
                moveBlock(getCoords(-1, 0, 0), -1, 0, 0);
            } else if (x0 > window.innerWidth * .75 && y0 > 80) { // right quarter of screen
                moveBlock(getCoords(1, 0, 0), 1, 0, 0); 
            } else if (y0 > 80) { // prevents rotating when tapping Pause button
                rotateBlock();
            }
        } else if (Math.abs(dx) < 30 && Math.abs(dy) < 30) {
            return; // too short
        } else if (Math.abs(dx) / Math.abs(dy) > 0.67 && Math.abs(dx) / Math.abs(dy) < 1.5) {
            return; // diagonal swipe 
        } else if (Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) { // left swipe
                moveBlock(getCoords(-1, 0, 0), -1, 0, 0);
            } else { // right swipe
                moveBlock(getCoords(1, 0, 0), 1, 0, 0);
            }
        } else {
            if (dy > 0) { // down swipe
                moveToBottom();
            }
        }
    }

    const touchStartHandler = e => {
        const touchObj = e.changedTouches[0];
        setSwipeStart([touchObj.clientX, touchObj.clientY]);
    }

    const touchEndHandler = e => {
        const touchObj = e.changedTouches[0];
        const [x0, y0] = swipeStart;
        touchHandler(x0, y0, touchObj.clientX - x0, touchObj.clientY - y0);
        setSwipeStart([]);
    }

    const checkForCompletedRows = (coords, shape) => {
        const allBlocks = [...restingBlocks, {shape: shape, x: coords[0][0], y: coords[0][1]}, {shape: shape, x: coords[1][0], y: coords[1][1]}, {shape: shape, x: coords[2][0], y: coords[2][1]}, {shape: shape, x: coords[3][0], y: coords[3][1]}];

        let counts = {}
        for (const block of allBlocks) {
            if (block.y in counts) {
                counts[block.y] += 1;
            } else {
                counts[block.y] = 1;
            }
        }
        
        Object.keys(counts).forEach(row => {
            if (counts[row] === width) {
                row = parseInt(row);
                let count = 0;
                for (let i = 0; i < allBlocks.length; i++) {
                    if (allBlocks[i].y !== row) {
                        allBlocks[count] = allBlocks[i];
                        if (allBlocks[count].y < row) {
                            allBlocks[count].y += 1;
                        }
                        count++;
                    } 
                }
                allBlocks.length = count;
                setTickPeriod(tickPeriod => tickPeriod * 0.9);
                setScore(score => score + 100);
            }
        })
        setRestingBlocks(allBlocks);
    }

    const checkGameOver = coords => {
        for (const block of coords) {
            if (block[1] < 1) {
                setGameOver(true);
                return true;
            }
        }
        return false;
    }

    const newBlock = coords => {
        setPosition([midPoint, 0, 0]);
        checkForCompletedRows(coords, shape);
        setShape(blockTypes[Math.floor(Math.random() * blockTypes.length)]);
        setScore(score => score + 10);
    }

    // KEY LISTENER
    useEffect(() => {
        if (!gameOver) {
            document.addEventListener('keydown', keyDownHandler);
            return () => document.removeEventListener('keydown', keyDownHandler);
        }
    })

    useEffect(() => {
        if (gameStarted && !paused && !gameOver) {
            document.addEventListener('touchstart', touchStartHandler);
            return () => document.removeEventListener('touchstart', touchStartHandler);
        }
    })

    useEffect(() => {
        if (gameStarted && !paused && !gameOver) {
            document.addEventListener('touchend', touchEndHandler);
            return () => document.removeEventListener('touchend', touchEndHandler);
        }
    })

    // CHECK IF BLOCK HITS THE BOTTOM
    useEffect(() => {
        const currCoords = getCoords(0, 0, 0);

        if (restingBlocks.length) {
            let hitBottom = false;
            for (const block of currCoords) {
                if (!hitBottom) {
                    for (const rBlock of restingBlocks) {
                        if ((block[0] === rBlock.x && block[1]+1 === rBlock.y) || block[1]+1 >= height) {
                            if (!checkGameOver(currCoords)) {
                                newBlock(currCoords);
                            };
                            hitBottom = true;
                            break;
                        }
                    }
                }
            }
        } else if (gameStarted) {
            for (const block of currCoords) {
                if (block[1]+1 >= height) {
                    if (!checkGameOver(currCoords)) {
                        newBlock(currCoords);
                    };
                    break;
                }
            }
        }
    })

    // GAME INTERVAL
    useEffect(() => {
        if (gameStarted && !paused) {
            const interval = setInterval(() => {
                moveBlock(getCoords(0, 1, 0), 0, 1, 0)
            }, tickPeriod)
            return () => clearInterval(interval)
        }
    }, [position[1], gameStarted, gameOver, paused]) //eslint-disable-line

    const blockComponents = useMemo(() => restingBlocks.map((block, i) => {
        return <BlockPiece size={pieceSize} left={block.x} top={block.y} key={i} shape={block.shape} />
    }), [restingBlocks, pieceSize]);

    const startGameHandler = () => {
        setPosition([midPoint, 0, 0]);
        setShape(blockTypes[Math.floor(Math.random() * blockTypes.length)]);
        setRestingBlocks([]);
        setGameOver(false);
        setTickPeriod(1000);
        setScore(0)
        setPaused(false);
        setGameStarted(true);
    }

    return (
        <div style={{
            overflow: 'hidden',
            width: width*pieceSize, 
            height: height*pieceSize,
            backgroundColor: 'white',
            top: `${(window.innerHeight-(height*pieceSize))/2}px`,
            left: `${(window.innerWidth-(width*pieceSize))/2}px`,
            position: 'fixed'
        }}>
            <Modal show={gameOver || !gameStarted || paused} >
                <Instructions show={!gameStarted} play={startGameHandler} />
                <HighScores show={gameOver} playAgain={startGameHandler} score={score} />
                <Pause show={paused} resume={() => setPaused(false)} />
            </Modal>
            {!paused && gameStarted ? <Button clicked={() => setPaused(true)} type='Pause'>PAUSE</Button> : null}
            {gameStarted ? <Score score={score} /> : null}
            <Block shape={shape} size={pieceSize} left={position[0]} top={position[1]} rotation={position[2]} />
            {blockComponents}
        </div>
    );
}

export default Gameboard;
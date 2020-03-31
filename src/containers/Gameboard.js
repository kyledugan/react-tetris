import React, { useState, useEffect, useMemo } from 'react';
import Block from '../components/Blocks/Block';
import SubBlock from '../components/Blocks/SubBlock';

// TODOS:
// 1. Detect game over (done)
// 2. Score system: 10 points per block and 100 points per finished row
// 3. Increase speed after each completed row (done)
// 4. Add different block colors (done)
// 5. Add game over modal
// 6. Fix check completed rows when interval (done)

const Gameboard = () => {
    const height = Math.floor(window.innerHeight/25);
    const width = Math.floor(window.innerWidth/25);
    const midPoint = Math.floor(width/2) - 1;
    const blockTypes = ['I', 'T', 'S', 'Square', 'L'];

    const [position, setPosition] = useState([midPoint, 0, 0]) //x, y, rotation
    const [shape, setShape] = useState('I');
    const [restingBlocks, setRestingBlocks] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [tickPeriod, setTickPeriod] = useState(1000);
    const [score, setScore] = useState(0);

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
        if (event.keyCode === 40) { //down
            moveBlock(getCoords(0, 1, 0), 0, 1, 0);
        } else if (event.keyCode === 38) { //up
            rotateBlock();
        } else if (event.keyCode === 37) { //left
            moveBlock(getCoords(-1, 0, 0), -1, 0, 0);
        } else if (event.keyCode === 39) { //right
            moveBlock(getCoords(1, 0, 0), 1, 0, 0);
        } else if (event.keyCode === 32) {
            moveToBottom();
        }
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
        console.log(score);
        const newShape = blockTypes[Math.floor(Math.random() * blockTypes.length)];
        setPosition([midPoint, 0, 0]);
        checkForCompletedRows(coords, shape);
        setShape(newShape);
        setScore(score => score + 10);
    }

    // KEY LISTENER
    useEffect(() => {
        if (!gameOver) {
            document.addEventListener('keydown', keyDownHandler)
            return () => document.removeEventListener('keydown', keyDownHandler);
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
        } else {
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
        const interval = setInterval(() => {
            moveBlock(getCoords(0, 1, 0), 0, 1, 0)
        }, tickPeriod)
        return () => clearInterval(interval)
    }, [position[1]]) //eslint-disable-line

    const blockComponents = useMemo(() => restingBlocks.map((block, i) => {
        return <SubBlock left={block.x} top={block.y} key={i} shape={block.shape} />
    }), [restingBlocks]);

    return (
        <div>
            <Block shape={shape} left={position[0]} top={position[1]} rotation={position[2]} />
            {blockComponents}
        </div>
    );
    
}

export default Gameboard;
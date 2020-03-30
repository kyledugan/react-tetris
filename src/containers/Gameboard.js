import React, { useState, useEffect } from 'react';
import Block from '../components/Blocks/Block';
import SubBlock from '../components/Blocks/SubBlock';

const Gameboard = () => {
    const height = Math.floor(window.innerHeight/25);
    const width = Math.floor(window.innerWidth/25);
    const blockTypes = ['T', 'I', 'L', 'S', 'Square'];

    const [xPosition, setXPosition] = useState(Math.floor(width/2) - 1);
    const [yPosition, setYPosition] = useState(0);
    const [shape, setShape] = useState('Square');
    const [rotations, setRotations] = useState(0);
    const [falling, setFalling] = useState(true);
    const [restingBlocks, setRestingBlocks] = useState([]);

    // TO DO:
    // 1. Prevent moving into another block (done)
    // 2. Finish formatting getCoords (done)
    // 3. Finish rotate logic (done)
    // 4. Add in timer
    // 5. Remove complete lines
    // 6. Reduce rerenders

    const checkCollision = (nextCoords) => {
        for (const block of nextCoords) {
            // prevent moving off the side of the screen
            if (block[0] < 0 || block[0]+1 > width) {
                return true;
            }
            // prevent moving into an existing block
            for (const rBlock of restingBlocks) {
                if (block[0] === rBlock[0] && block[1] === rBlock[1]) {
                    return true;
                }
            }
        }
    }

    const getCoords = (rotation, xOffset, yOffset) => {
        const newX = xPosition + xOffset;
        const newY = yPosition + yOffset;
        const newR = rotations + rotation;
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

    const moveBlock = (nextCoords, r, x, y) => {
        if (falling && !checkCollision(nextCoords)) {
            setXPosition(xPosition => xPosition + x);
            setYPosition(yPosition => yPosition + y);
            setRotations(rotations => rotations + r);
        }
    }

    const rotate = () => {
        const nextCoords = getCoords(1, 0, 0);
        if (!falling) {
            return;
        }

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
            moveBlock(getCoords(1, -minX[0], 0), 1, -minX[0], 0)
        } else if (maxX[0] >= width) {
            moveBlock(getCoords(1, -(maxX[0]-width+1), 0), 1, -(maxX[0]-width+1), 0)
        } else {
            moveBlock(nextCoords, 1, 0, 0)
        }
    }

    const moveToBottom = () => {
        const coords = getCoords(0, 0, 0);
        let distance = height;
        for (let block of coords) {
            let distToBottom = height - block[1] - 1;
            if (restingBlocks.length) {
                for (const rBlock of restingBlocks) {
                    if (rBlock[0] === block[0]) {
                        if (rBlock[1] - block[1] - 1 < distToBottom) {
                            distToBottom = rBlock[1] - block[1] - 1
                            
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
        moveBlock(getCoords(0, 0, distance), 0, 0, distance);
    }

    const keyDownHandler = event => {
        if (event.keyCode === 40) { //down
            moveBlock(getCoords(0, 0, 1), 0, 0, 1);
        } else if (event.keyCode === 38) { //up
            rotate();
        } else if (event.keyCode === 37) { //left
            moveBlock(getCoords(0, -1, 0), 0, -1, 0);
        } else if (event.keyCode === 39) { //right
            moveBlock(getCoords(0, 1, 0), 0, 1, 0);
        } else if (event.keyCode === 32) {
            moveToBottom();
        }
    }

    const createNewBlock = () => {
        const newShape = blockTypes[Math.floor(Math.random() * blockTypes.length)];
        setRotations(0);
        setXPosition(18);
        setYPosition(0);
        setShape(newShape);
        setFalling(true);
    }

    const nextBlock = coords => {
        setFalling(false);
        createNewBlock();
        setRestingBlocks(restingBlocks => [...restingBlocks, coords[0], coords[1], coords[2], coords[3]])
    }

    // KEY LISTENER
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)
        return () => document.removeEventListener('keydown', keyDownHandler);
    }, [xPosition, yPosition, rotations]) //eslint-disable-line

    // CHECK IF BLOCK HITS THE BOTTOM
    useEffect(() => {
        const currCoords = getCoords(0, 0, 0);
        if (restingBlocks.length > 0) {
            for (const block of currCoords) {
                for (const rBlock of restingBlocks) {
                    if ((block[0] === rBlock[0] && block[1]+1 === rBlock[1]) || block[1]+1 >= height) {
                        nextBlock(currCoords);
                        break;
                    }
                }
            }
        } else {
            for (const block of currCoords) {
                if (block[1]+1 >= height) {
                    nextBlock(currCoords);
                    break;
                }
            }
        }
    }, [yPosition, xPosition, rotations])

    const blockComponents = restingBlocks.map((block, i) => {
        return <SubBlock left={block[0]} top={block[1]} key={i} />
    });

    return (
        <div>
            <Block shape={shape} left={xPosition} top={yPosition} rotation={rotations} />
            {blockComponents}
        </div>
    );
    
}

export default Gameboard;
import React from 'react';
import Gameboard from './containers/Gameboard';
// import Block from './components/Blocks/Block';

const App = () => {
    // const [rotationCount, setRotationCount] = useState(0);
    // const [xPosition, setXPosition] = useState(200);
    // const [yPosition, setYPosition] = useState(25);
    // const blockTypes = ['T', 'L', 'S', 'I', 'Square'];

    // const tickPeriod = 2000;

    // const moveBlockDown = () => {
    //     setYPosition(yPosition => yPosition + 25);
    // }

    // useEffect(() => {
    //     document.addEventListener('keydown', keyDownHandler)

    //     var fallingBlock = createBlock();

    //     setInterval(() => {
    //         moveBlockDown();
    //     }, tickPeriod)

    // }, []) //eslint-disable-line

    // const keyDownHandler = event => {
    //     if (event.keyCode === 38) {
    //         setRotationCount(rotationCount => rotationCount+1)
    //     } else if (event.keyCode === 40) {
    //         setRotationCount(rotationCount => rotationCount-1)
    //     } else if (event.keyCode === 37) {
    //         setXPosition(xPosition => xPosition - 25);
    //     } else if (event.keyCode === 39) {
    //         setXPosition(xPosition => xPosition + 25);
    //     }
    // }

    // const createBlock = () => {
    //     const shape = blockTypes[Math.floor(Math.random() * blockTypes.length)];
    //     return <Block shape={shape} />
    // }

    // const newBlock = createBlock();

    return (
        <div>
            <Gameboard />
        </div>
    );
}

export default App;
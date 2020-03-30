const getCoords = (rotation, xOffset, yOffset) => {
    const newX = xPosition + xOffset;
    const newY = yPosition + yOffset;
    const newR = rotations + rotation;
    switch (shape) {
        case 'I':
            if (newR % 2 === 0) {
                return [[newX, newX, newX, newX], [newY-1, newY, newY+1, newY+2]];
            } else {
                return [[newX-1, newX, newX+1, newX+2], [newY, newY, newY, newY]];
            }
        case 'T': 
            if (newR % 4 === 0) {
                return [[newX, newX-1, newX+1, newX], [newY, newY, newY, newY+1]];
            } else if (newR % 4 === 1) {
                return [[newX, newX, newX+1, newX], [newY, newY-1, newY, newY+1]];
            } else if (newR % 4 === 2) {
                return [[newX, newX, newX+1, newX-1], [newY, newY-1, newY, newY]];
            } else {
                return [[newX, newX, newX-1, newX], [newY, newY+1, newY, newY-1]];
            }
        case 'L':
            if (newR % 4 === 0) {
                return [[newX, newX, newX, newX+1], [newY-1, newY, newY+1, newY+1]];
            } else if (newR % 4 === 1) {
                return [[newX-1, newX, newX+1, newX+1], [newY, newY, newY, newY-1]];
            } else if (newR % 4 === 2) {
                return [[newX-1, newX, newX, newX], [newY-1, newY-1, newY, newY+1]];
            } else {
                return [[newX-1, newX-1, newX, newX+1], [newY, newY+1, newY, newY]];
            }
        case 'Square':
            return [[newX, newX, newX+1, newX+1], [newY, newY+1, newY+1, newY]];
        case 'S':
            if (newR % 2 === 0) {
                return [[newX, newX, newX+1, newX-1], [newY, newY+1, newY, newY+1]];
            } else {
                return [[newX, newX, newX+1, newX+1], [newY, newY-1, newY, newY+1]];
            }
        default:
            break;
    }
}

export default getCoords;
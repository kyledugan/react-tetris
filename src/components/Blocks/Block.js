import React from 'react';
import BlockPiece from './BlockPiece';

const Block = props => {
    switch (props.shape) {
        case 'I':
            if (props.rotation % 4 === 0 || props.rotation % 4 === 2) {
                return (
                    <div>
                        <BlockPiece top={props.top-2} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top-1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left-1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+2} shape={props.shape} size={props.size} />
                    </div>
                );
            }
        case 'L':
            if (props.rotation % 4 === 0) {
                return (
                    <div>
                        <BlockPiece top={props.top-1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left+1} shape={props.shape} size={props.size} />
                    </div>
                );
            } else if (props.rotation % 4 === 1) {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left-1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top-1} left={props.left+1} shape={props.shape} size={props.size} />
                    </div>
                );
            } else if (props.rotation % 4 === 2) {
                return (
                    <div>
                        <BlockPiece top={props.top-1} left={props.left-1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top-1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left-1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left-1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                    </div>
                );
            } 
        case 'Square':
            return (
                <div>
                    <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                    <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                    <BlockPiece top={props.top+1} left={props.left+1} shape={props.shape} size={props.size} />
                    <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                </div>
            );
        case 'S':
            if (props.rotation % 2 === 0) {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left-1} shape={props.shape} size={props.size} />
                    </div>
                    
                );
            } else {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top-1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left+1} shape={props.shape} size={props.size} />
                    </div>
                );
            };
        case 'T':
            if (props.rotation % 4 === 0) {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left-1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                    </div>
                );
            } else if (props.rotation % 4 === 1) {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top-1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                    </div>
                );
            } else if (props.rotation % 4 === 2) {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top-1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left+1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left-1} shape={props.shape} size={props.size} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <BlockPiece top={props.top} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top+1} left={props.left} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top} left={props.left-1} shape={props.shape} size={props.size} />
                        <BlockPiece top={props.top-1} left={props.left} shape={props.shape} size={props.size} />
                    </div>
                );
            } 
        default:
            return null;
    }

}

export default Block;
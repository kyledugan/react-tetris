import React from 'react';
import SubBlock from './SubBlock';

const Block = props => {
    switch (props.shape) {
        case 'I':
            if (props.rotation % 4 === 0 || props.rotation % 4 === 2) {
                return (
                    <div>
                        <SubBlock top={props.top-2} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top-1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left-1} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+2} shape={props.shape} />
                    </div>
                );
            }
        case 'L':
            if (props.rotation % 4 === 0) {
                return (
                    <div>
                        <SubBlock top={props.top-1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left+1} shape={props.shape} />
                    </div>
                );
            } else if (props.rotation % 4 === 1) {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left-1} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                        <SubBlock top={props.top-1} left={props.left+1} shape={props.shape} />
                    </div>
                );
            } else if (props.rotation % 4 === 2) {
                return (
                    <div>
                        <SubBlock top={props.top-1} left={props.left-1} shape={props.shape} />
                        <SubBlock top={props.top-1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left-1} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left-1} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                    </div>
                );
            } 
        case 'Square':
            return (
                <div>
                    <SubBlock top={props.top} left={props.left} shape={props.shape} />
                    <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                    <SubBlock top={props.top+1} left={props.left+1} shape={props.shape} />
                    <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                </div>
            );
        case 'S':
            if (props.rotation % 2 === 0) {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left-1} shape={props.shape} />
                    </div>
                    
                );
            } else {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top-1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left+1} shape={props.shape} />
                    </div>
                );
            };
        case 'T':
            if (props.rotation % 4 === 0) {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left-1} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                    </div>
                );
            } else if (props.rotation % 4 === 1) {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top-1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                    </div>
                );
            } else if (props.rotation % 4 === 2) {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top-1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left+1} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left-1} shape={props.shape} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <SubBlock top={props.top} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top+1} left={props.left} shape={props.shape} />
                        <SubBlock top={props.top} left={props.left-1} shape={props.shape} />
                        <SubBlock top={props.top-1} left={props.left} shape={props.shape} />
                    </div>
                );
            } 
        default:
            return null;
    }

}

export default Block;
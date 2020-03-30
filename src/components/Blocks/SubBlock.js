import React from 'react';
import classes from './Block.module.css';

const SubBlock = props => (
    <div 
        className={[classes.SubBlock, classes[props.shape]].join(' ')} 
        style={{top: props.top*25, left: props.left*25}} 
    />
);

export default SubBlock;
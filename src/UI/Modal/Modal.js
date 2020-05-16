import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const showAndLoadingAreEqual = (prevProps, nextProps) => {
    // console.log(prevProps.chldren === nextProps.children);
    return (prevProps.show === nextProps.show);
};

const Modal = props => {
    return (
        <Fragment>
            <Backdrop show={props.show} />
            <div 
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(-50%)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0.5'
                }}>
                {props.children}

            </div>
        </Fragment>
    );
};

export default React.memo(Modal, showAndLoadingAreEqual);
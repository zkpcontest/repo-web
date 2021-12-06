import React from "react";
import {Spinner} from "react-bootstrap";


interface IPreloaderProps {
    animation?: 'grow' | 'border';
    size?: 'sm';
    text?: string;
    className?: string;
}

const Preloader = (props: IPreloaderProps) => {
    const {animation = 'grow', text = 'Loading...', size, className = ''} = props;

    return (
        <div className={`d-flex align-items-center ${className}`}>
            <Spinner animation={animation} size={size}/>
            <span className={'ms-3'}>{text}</span>
        </div>
    );
}

export default Preloader;

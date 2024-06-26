import React from 'react';
import './style.css';

const ProgressBar = ({ progress, bgColor }) => {
    return (
        <div className="progress-wrapper">
            <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: `${bgColor}` }} />
        </div>
    )
}

export default ProgressBar;
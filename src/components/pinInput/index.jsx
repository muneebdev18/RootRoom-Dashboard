import React from 'react';

import PinInput from './PinInput';
import './style.css';

const Pin = () => {
    let compPin = 1999;
    const handlePinComplete = (pin) => {
        pin = Number(pin);
        if (pin === compPin) {
            console.log('Correct PIN:', [pin, compPin]);
        } else {
            console.log('Incorrect PIN:', [pin, compPin]);
        }
    };

    return (
        <div className="pin_main">
            <PinInput length={4} onComplete={handlePinComplete} />
        </div>
    )
}

export default Pin;
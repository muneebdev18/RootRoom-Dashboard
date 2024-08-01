import React, { memo } from 'react';

import PinInput from './PinInput';
import './style.css';

const Pin = ({setPinValue}) => {

    const handlePinComplete = (pin) => {
        pin = Number(pin);
        setPinValue(pin)
    };
    return (
        <div className="pin_main">
            <PinInput length={4} onComplete={handlePinComplete} />
        </div>
    )
}

export default memo(Pin);
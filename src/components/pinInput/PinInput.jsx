import React, { useState, useRef } from 'react';

import './style.css';

const PinInput = ({ length, onComplete }) => {
    const [pins, setPins] = useState(Array(length).fill(''));
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        const newPins = [...pins];
        newPins[index] = value;

        setPins(newPins);

        // Move focus to the next input
        if (value !== '' && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (newPins.every((pin) => pin !== '')) {
            onComplete(newPins.join(''));
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && pins[index] === '' && index > 0) {
            // Move focus to the previous input on Backspace press
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="pin_input_container">
            {pins.map((pin, index) => (
                <input
                    key={index}
                    type="password"
                    maxLength={1}
                    value={pin}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="pin_input"
                />
            ))}
        </div>
    )
}

export default PinInput;
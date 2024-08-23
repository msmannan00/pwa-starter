import React, { useState } from 'react';
import PropTypes from 'prop-types';

const OtpInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value) || value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Check if all digits are filled
    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
    } else if (value !== '') {
      const nextInput = e.target.nextElementSibling;
      if (nextInput !== null) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index !== 0 && otp[index] === '') {
      const prevInput = e.target.previousElementSibling;
      if (prevInput !== null) {
        prevInput.focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          className="text-black"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: '40px',
            height: '40px',
            marginRight: '5px',
            textAlign: 'center',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '1.2em',
            outline: 'none',
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;

// Props validation
OtpInput.propTypes = {
  length: PropTypes.number,
  onComplete: PropTypes.func.isRequired,
};

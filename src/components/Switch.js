import React from 'react';

const Switch = ({ id, isToggled, toggleSwitch }) => {
  return (
    <div className="flex items-center justify-center">
      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" id={id} className="sr-only" onChange={toggleSwitch} checked={isToggled} />
          <div className={`block w-12 h-6 rounded-full ${isToggled ? 'bg-[#20c374]' : 'bg-[#d1d1d6]'}`}></div>
          <div className={`dot absolute left-[2px] top-[2px] bg-white w-5 h-5 rounded-full transition-transform ${isToggled ? 'transform translate-x-6' : ''}`}></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
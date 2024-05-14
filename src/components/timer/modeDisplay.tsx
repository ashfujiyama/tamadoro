/**
 * 
 * takes in what mode it currently is in and displays it
 * 
 **/
 
import React from 'react';


interface ModeDisplayProps {
  isFocus: boolean; 
}

// Component that returns "focus" or "break" based on the prop
const ModeDisplay: React.FC<ModeDisplayProps> = ({ isFocus }) => {
  const message = isFocus ? 'focus' : 'break';
  return <div style = {{margin: '.5rem'}}>{message} mode</div>;
};

export default ModeDisplay;

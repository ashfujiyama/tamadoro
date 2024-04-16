import React from 'react';
import Timer from '../timer/timer'; 
import Inventory from '../pet/inventory'; 
import "./tamadoro.css";

const Tamadoro: React.FC = () => {
  return (
    <div className = "screen">
      <div>
        <Timer />
        <Inventory />
      </div>
    </div>
  );
};

export default Tamadoro;

import React from 'react';
import Timer from '../timer/timer'; 
import Inventory from '../pet/inventory'; 


const Tamadoro: React.FC = () => {
  return (
    <div>
      <div>
        <Timer />
        <Inventory />
      </div>
    </div>
  );
};

export default Tamadoro;

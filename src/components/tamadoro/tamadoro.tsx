import React from 'react';
import Timer from '../timer/timer';
import Inventory from '../pet/inventory';
import LevelBar from '../pet/levelBar';
import PetDisplay from '../pet/petDisplay';
import ModeDisplay from '../timer/modeDisplay';

import "./tamadoro.css";

const Tamadoro: React.FC = () => {
  return (
    <div className="screen">
      <div>
        <PetDisplay
          src="https://s9.gifyu.com/images/SZoHU.gif"
          alt="TamaPet"
        />
        <Timer />
        <ModeDisplay isFocus={false} />
        <LevelBar />
        <Inventory />
      </div>
    </div>
  );
};

export default Tamadoro;



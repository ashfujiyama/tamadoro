import React from "react";
import Timer from "../timer/timer";
import Inventory from "../pet/inventory";
import LevelBar from "../pet/levelBar";
import PetDisplay from "../pet/petDisplay";

import "./tamadoro.css";

const Tamadoro: React.FC = () => {
  return (
    <div className="screen">
      <div>
        <PetDisplay src="https://s9.gifyu.com/images/SZoHU.gif" alt="TamaPet" />
        <Timer />
        <Inventory />
        <LevelBar />
      </div>
    </div>
  );
};

export default Tamadoro;

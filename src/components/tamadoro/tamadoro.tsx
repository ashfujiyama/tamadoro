import React from "react";
import Timer from "../timer/timer";
import Inventory from "../pet/inventory";
import LevelBar from "../pet/levelBar";

import "./tamadoro.css";

const Tamadoro: React.FC = () => {
  return (
    <div className="screen">
      <div>
        <Inventory />
        <Timer />
        <LevelBar />
      </div>
    </div>
  );
};

export default Tamadoro;

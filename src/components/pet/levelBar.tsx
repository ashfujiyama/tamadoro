import "./levelBar.css";

import { useState, useEffect } from "react";

const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
  const barWidth = (hp / maxHp) * 100;
  // setHitWidth((damage / hp) * 100);
  // setBarWidth((hpLeft / maxHp) * 100);
  return (
    <div>
      <div className="health-bar">
        <div className="bar" style={{ width: `${barWidth}%` }}></div>
        <div className="hit" style={{ width: `${0}%` }}></div>

        <div
          style={{
            position: "absolute",
            top: "5px",
            left: 0,
            right: 0,
            textAlign: "center"
          }}
        >
          {hp} / {maxHp}
        </div>
      </div>

      <br />
    </div>
  );
};

const ControlledHealthBar = () => {
  const maxHp = 100;
  const [hp, setHp] = useState(maxHp);
  return (
    <div>
      <HealthBar hp={hp} maxHp={maxHp} />
      <button
        className="damage random"
        onClick={() => {
          var damage = Math.floor(Math.random() * maxHp);
          setHp(Math.max(0, hp - damage));
        }}
      >
        hit random
      </button>

      <button
        className="reset"
        onClick={() => {
          setHp(maxHp);
        }}
      >
        reset
      </button>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <ControlledHealthBar />
    </div>
  );
}

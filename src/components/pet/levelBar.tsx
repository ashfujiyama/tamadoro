import "./levelBar.css";

interface LevelBarProps {
  fullXP: number; // Maximum health
}

const LevelBar: React.FC<LevelBarProps> = ({ fullXP = 0 }) => {
  const level = fullXP / 100;
  const xpOverflow = fullXP % 100;
  const maxXP = (level + 1) * 100;
  const barWidth = (xpOverflow / maxXP) * 100;

  return (
    <div>
      <div> lvl {level}</div>
      <div className="level-bar">
        <div className="bar" style={{ width: `${barWidth}%` }}></div>
      </div>
    </div>
  );
};

export default LevelBar;

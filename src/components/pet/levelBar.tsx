import "./levelBar.css";

interface LevelBarProps {
  fullXP: number; // Maximum health
}

const LevelBar: React.FC<LevelBarProps> = ({ fullXP = 0 }) => {
  const level = Math.floor(fullXP / 100);
  const maxXP = (level + 1) * 100; // xp required to complete this level
  const completeXP = level * 100; // xp that filled up lower levels
  const xpOverflow = (fullXP - completeXP) % maxXP; // xp attributed to this level
  const barWidth = (xpOverflow / maxXP) * 100;

  return (
    <div>
      <div>{fullXP}</div>
      <div> lvl {level}</div>
      <div className="level-bar">
        <div className="bar" style={{ width: `${barWidth}%` }}></div>
      </div>
    </div>
  );
};

export default LevelBar;

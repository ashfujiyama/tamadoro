import "./levelBar.css";

interface LevelBarProps {
  fullXP: number; // Maximum health
}

const LevelBar: React.FC<LevelBarProps> = ({ fullXP = 0 }) => {
  // Calculate the level based on accumulated XP
  let level = 0;
  let totalXP = 0;
  while (totalXP <= fullXP) {
    level++;
    totalXP += level * 100;
  }

  // Calculate the maximum XP required to complete this level
  const maxXP = level * 100;

  // Calculate the XP required to complete lower levels
  let completeXP = 0;
  let i = 1;
  while (i < level) {
    completeXP += i * 100;
    i++;
  }

  // Calculate the XP attributed to this level
  const xpOverflow = (fullXP - completeXP) % maxXP;

  // Calculate the width of the level bar
  let barWidth = (xpOverflow / maxXP) * 100;

  if (fullXP == 0) {
    barWidth = 0;
  } 

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

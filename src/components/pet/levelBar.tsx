import "./levelBar.css";

interface LevelBarProps {
  maxHp: number; // Maximum health
  hp: number; // Current health
}

const LevelBar: React.FC<LevelBarProps> = ({ maxHp = 100, hp = 100 }) => {
  const barWidth = (hp / maxHp) * 100; 

  return (
    <div>
      <div> lvl 21</div>
      <div className="level-bar">
        <div className="bar" style={{ width: `${barWidth}%` }}></div>
      </div>
    </div>
  );
};

export default LevelBar;

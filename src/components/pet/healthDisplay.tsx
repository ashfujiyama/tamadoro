import React from 'react';
import { FullHeart, HalfHeart, GrayHeart } from './heartIcons';

interface HealthDisplayProps {
  health: number; // Health between 0 and 100
}

const HealthDisplay: React.FC<HealthDisplayProps> = ({ health }) => {
  const fullHearts = Math.floor(health / 10); 
  const hasHalfHeart = (health % 10) > 0; 

  const totalFullHearts = health === 100 ? 10 : fullHearts;
  const halfHeart = hasHalfHeart ? 1 : 0;

  const grayHeartsCount = health === 0 ? 10 : 10 - totalFullHearts - halfHeart;

  const hearts = [];

  for (let i = 0; i < totalFullHearts; i++) {
    hearts.push(<FullHeart key={`full-${i}`} />);
  }

  if (halfHeart && health > 0) {
    hearts.push(<HalfHeart key="half" />);
  }

  for (let i = 0; i < grayHeartsCount; i++) {
    hearts.push(<GrayHeart key={`gray-${i}`} />);
  }

  return <div style={{ margin: '.5rem' }}>{hearts}</div>; 
};

export default HealthDisplay;

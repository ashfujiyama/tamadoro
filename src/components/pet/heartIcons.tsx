import React from 'react';

const FullHeart = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="black">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" />
  </svg>
);

const HalfHeart = () => (
  <svg viewBox="0 0 24 24" width="14" height="14">
    <path
      fill="black"
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09V21.35Z"
    />
    <path
      fill="gray"
      d="M12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
    />
  </svg>
  
);

const GrayHeart = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="gray">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
    />
  </svg>
);

export { FullHeart, HalfHeart, GrayHeart };

import React from 'react';
import "./petDisplay.css";

interface ImageDisplayProps {
  src: string; 
  alt: string; 
}

const PetDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="image"/>
  );
};

export default PetDisplay;
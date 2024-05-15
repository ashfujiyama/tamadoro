import React from "react";
import { Food } from "../types/foodType";

interface FoodProps {
  food: Food;
  selected: Food;
}

const FoodComponent: React.FC<FoodProps> = ({ food, selected }) => {
  return (
    <div>
      <p>
        {food.count}
        <img src={food.image} alt={food.type} width="20pt" height="20pt" />
      </p>
      
    </div>
  );
};

export default FoodComponent;

import React from "react";
import { Food } from "../types/foodType";

interface FoodProps {
  food: Food;
  onIncrease: () => void;
}

const Food: React.FC<FoodProps> = ({ food, onIncrease }) => {
  return (
    <div>
      <p>
        <img src={food.image} alt={food.type} />: {food.count}
      </p>
      <button onClick={onIncrease}>Add {food.type}</button>
    </div>
  );
};

export default Food;

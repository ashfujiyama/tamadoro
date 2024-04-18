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
        <img src={food.image} alt={food.type} width="30px" height="30px" />:{" "}
        {food.count}
      </p>
      {food.type === selected.type && <p>{selected.type}</p>}
    </div>
  );
};

export default FoodComponent;

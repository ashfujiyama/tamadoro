import React from "react";
import { Food } from "../types/foodType";

interface FoodProps {
  food: Food;
  // onIncrease: () => void;
  // onDecrease: () => void;
  selected: Food;
}

const FoodComponent: React.FC<FoodProps> = ({
  food,
  // onIncrease,
  // onDecrease,
  selected,
}) => {
  return (
    <div>
      <p>
        <img src={food.image} alt={food.type} />: {food.count}
      </p>
      {/* <button onClick={onIncrease}>Reward {food.type}</button>
      <button onClick={onDecrease}>Feed {food.type}</button> */}
      {food.type === selected.type && <p>this one is chosen</p>}
    </div>
  );
};

export default FoodComponent;

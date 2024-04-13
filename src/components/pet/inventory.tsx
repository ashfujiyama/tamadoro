// Inventory.tsx

import React, { useState } from "react";
import { FoodType, increaseFoodCount } from "../types/foodType";
import Food from "./food";

const Inventory = () => {
  const [tomatoes, setTomatoes] = useState({
    type: FoodType.Tomato,
    points: 5,
    count: 0,
    image: "",
  });
  const [cakeSlices, setCakeSlices] = useState({
    type: FoodType.CakeSlice,
    points: 5,
    count: 0,
    image: "",
  });
  const [cake, setCake] = useState({
    type: FoodType.Cake,
    points: 5,
    count: 0,
    image: "public/images/cake.png",
  });

  // Function to handle increasing food count
  const handleIncreaseFoodCount = () => {
    setTomatoes((prevTomatoes) => increaseFoodCount(prevTomatoes));
  };

  return (
    <div>
      <Food food={tomatoes} onIncrease={handleIncreaseFoodCount} />
      <Food food={cakeSlices} onIncrease={handleIncreaseFoodCount} />
      <Food food={cake} onIncrease={handleIncreaseFoodCount} />
    </div>
  );
};

export default Inventory;

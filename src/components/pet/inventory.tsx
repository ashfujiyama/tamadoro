// needs to add food based on timer

import { useState } from "react";
import { Food, FoodType } from "../types";

const Inventory = () => {
  const resetInventory = () => {
    return {
      tomatoes: { type: FoodType.Tomato, count: 0 },
      cakeSlices: { type: FoodType.CakeSlice, count: 0 },
      cakes: { type: FoodType.Cake, count: 0 },
    };
  };

  const [inventory, setInventory] = useState(resetInventory());

  const increaseFoodCount = (type: keyof typeof inventory) => {
    setInventory((prevInventory) => {
      const updatedInventory = { ...prevInventory };
      updatedInventory[type].count++;
      return updatedInventory;
    });
  };

  return (
    <div>
      {/* add food icons and change count display */}
      <p>tomatoes: {inventory.tomatoes.count}</p>
      <button onClick={() => increaseFoodCount("tomatoes")}>
        Add Tomato
      </button>{" "}
      <p>cakeSlices: {inventory.cakeSlices.count}</p>
      <button onClick={() => increaseFoodCount("cakeSlices")}>
        Add Cake Slice
      </button>{" "}
      <p>cakes: {inventory.cakes.count}</p>
      <button onClick={() => increaseFoodCount("cakes")}>Add Cake</button>{" "}
    </div>
  );
};

export default Inventory;

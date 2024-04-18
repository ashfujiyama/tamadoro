// to dos: feed function needs to increase hp, change feed to decrcease

import React, { useState } from "react";
import {
  Food,
  FoodType,
  decreaseFoodCount,
  increaseFoodCount,
} from "../types/foodType";
import FoodComponent from "./food";

const Inventory = () => {
  // create 3 states for each food
  const [tomatoes, setTomatoes] = useState<Food>({
    type: FoodType.Tomato,
    points: 5,
    count: 0,
    image: "../images/cake.png",
  });
  const [cakeSlices, setCakeSlices] = useState<Food>({
    type: FoodType.CakeSlice,
    points: 15,
    count: 0,
    image: "../images/cake.png",
  });
  const [cake, setCake] = useState<Food>({
    type: FoodType.Cake,
    points: 100,
    count: 0,
    image: "../images/cake.png",
  });

  // make state for current chosen food
  const [chooseFood, setChooseFood] = useState(tomatoes);

  // handle tomato count
  const increaseTomatoes = () => {
    setTomatoes((prevTomatoes) => increaseFoodCount(prevTomatoes));
  };
  const decreaseTomatoes = () => {
    setTomatoes((prevTomatoes) => decreaseFoodCount(prevTomatoes));
  };

  // handle cake slice count
  const increaseCakeSlice = () => {
    setCakeSlices((prevCakeSlice) => increaseFoodCount(prevCakeSlice));
  };
  const decreaseCakeSlice = () => {
    setCakeSlices((prevCakeSlice) => decreaseFoodCount(prevCakeSlice));
  };

  // handle cake count
  const increaseCake = () => {
    setCake((prevCakeSlice) => increaseFoodCount(prevCakeSlice));
  };
  const decreaseCake = () => {
    setCake((prevCake) => decreaseFoodCount(prevCake));
  };

  // decrease count of current chosen food
  const feed = () => {
    switch (chooseFood.type) {
      case "Tomato":
        increaseTomatoes();
        break;
      case "Cake Slice":
        increaseCakeSlice();
        break;
      case "Cake":
        increaseCake();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div>
        <button onClick={() => setChooseFood(tomatoes)}>
          <FoodComponent food={tomatoes} selected={chooseFood} />
        </button>
        <button onClick={() => setChooseFood(cakeSlices)}>
          <FoodComponent food={cakeSlices} selected={chooseFood} />
        </button>
        <button onClick={() => setChooseFood(cake)}>
          <FoodComponent food={cake} selected={chooseFood} />
        </button>
      </div>
      <div>
        <button onClick={() => feed()}>Feed!</button>
      </div>
    </>
  );
};

export default Inventory;

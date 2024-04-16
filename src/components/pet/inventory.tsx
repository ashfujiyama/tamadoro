// Inventory.tsx

import React, { useState } from "react";
import {
  FoodType,
  decreaseFoodCount,
  increaseFoodCount,
} from "../types/foodType";
import Food from "./food";
import FoodComponent from "./food";

const Inventory = () => {
  const [tomatoes, setTomatoes] = useState({
    type: FoodType.Tomato,
    points: 5,
    count: 0,
    image: "",
  });
  const [cakeSlices, setCakeSlices] = useState({
    type: FoodType.CakeSlice,
    points: 15,
    count: 0,
    image: "",
  });
  const [cake, setCake] = useState({
    type: FoodType.Cake,
    points: 100,
    count: 0,
    image: "public/images/cake.png",
  });
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

  const feed = (chooseFood: FoodType) => {
    if (chooseFood === "Tomato") {
      increaseTomatoes;
    }
  };

  return (
    <>
      <div>
        <Food food={tomatoes} selected={chooseFood} />
        <Food food={cakeSlices} selected={chooseFood} />
        <Food food={cake} selected={chooseFood} />
      </div>
      <div>{/* <button onClick={feed}>Feed!</button> */}</div>
    </>
  );
};

export default Inventory;

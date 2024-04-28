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
    chrome.storage.sync.get("iTomato", (result) => {
      if (result === null) {

        const key = 'iTomato';
        const value = { count: 1 };

        chrome.storage.sync.set({[key]: value}, () => {
          console.log("made new tomato counter");
        });
      } else {
        console.log('Retrieved count: ' + result.iTomato.count);
        const newCount = result.iTomato.count + 1;
        chrome.storage.sync.set({"iTomato": {count: [newCount]}}, () => {
          console.log('Updated tomato count: ' + newCount);
        })
      }
    }); 
    setTomatoes((prevTomatoes) => increaseFoodCount(prevTomatoes));
  };
  const decreaseTomatoes = () => {
    chrome.storage.sync.get("iTomato", (result) => {
      if (result === null) {
        console.log("tried to get negative tomato");
      } else {
        console.log('Retrieved count: ' + result.iTomato.count);
        const newCount = result.iTomato.count - 1;
        if (newCount < 0) {
          console.log("tried to get negative tomato");
        } else {
          chrome.storage.sync.set({"iTomato": {count: [newCount]}}, () => {
            console.log('Updated tomato count: ' + newCount);
          });
        }
      }
    });
    setTomatoes((prevTomatoes) => decreaseFoodCount(prevTomatoes));
  };

  // handle cake slice count
  const increaseCakeSlice = () => {
    chrome.storage.sync.get("iSlice", (result) => {
      if (result === null) {

        const key = 'iSlice';
        const value = { count: 1 };

        chrome.storage.sync.set({[key]: value}, () => {
          console.log("made new cake slice counter");
        });
      } else {
        console.log('Retrieved count: ' + result.iSlice.count);
        const newCount = result.iSlice.count + 1;
        chrome.storage.sync.set({"iSlice": {count: [newCount]}}, () => {
          console.log('Updated cake slice count: ' + newCount);
        })
      }
    });
    
    setCakeSlices((prevCakeSlice) => increaseFoodCount(prevCakeSlice));
  };
  const decreaseCakeSlice = () => {
    chrome.storage.sync.get("iSlice", (result) => {
      if (result === null) {
        console.log("tried to get negative cake slice");
      } else {
        console.log('Retrieved count: ' + result.iSlice.count);
        const newCount = result.iSlice.count - 1;
        if (newCount < 0) {
          console.log("tried to get negative cake slice");
        } else {
          chrome.storage.sync.set({"iSlice": {count: [newCount]}}, () => {
            console.log('Updated cake slice count: ' + newCount);
          });
        }
      }
    });
    setCakeSlices((prevCakeSlice) => decreaseFoodCount(prevCakeSlice));
  };

  // handle cake count
  const increaseCake = () => {
    chrome.storage.sync.get("iCake", (result) => {
      if (result === null) {

        const key = 'iCake';
        const value = { count: 1 };

        chrome.storage.sync.set({[key]: value}, () => {
          console.log("made new cake counter");
        });
      } else {
        console.log('Retrieved count: ' + result.iCake.count);
        const newCount = result.iCake.count + 1;
        chrome.storage.sync.set({"iCake": {count: [newCount]}}, () => {
          console.log('Updated cake count: ' + newCount);
        })
      }
    });
    setCake((prevCakeSlice) => increaseFoodCount(prevCakeSlice));
  };
  const decreaseCake = () => {
    chrome.storage.sync.get("iCake", (result) => {
      if (result === null) {
        console.log("tried to get negative cake");
      } else {
        console.log('Retrieved count: ' + result.iCake.count);
        const newCount = result.iCake.count - 1;
        if (newCount < 0) {
          console.log("tried to get negative cake");
        } else {
          chrome.storage.sync.set({"iCake": {count: [newCount]}}, () => {
            console.log('Updated cake count: ' + newCount);
          });
        }
      }
    });
    setCake((prevCake) => decreaseFoodCount(prevCake));
  };

  // decrease count of current chosen food
  const feed = () => {
    switch (chooseFood.type) {
      case "Tomato":
        decreaseTomatoes();
        break;
      case "Cake Slice":
        decreaseCakeSlice();
        break;
      case "Cake":
        decreaseCake();
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

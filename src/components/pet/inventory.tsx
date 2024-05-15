import "./inventory.css";

// to dos: feed function needs to increase hp, change feed to decrcease

import React, { useEffect, useState } from "react";
import { Food, FoodType } from "../types/foodType";
import FoodComponent from "./food";

const Inventory = () => {
  // create 3 states for each food
  const [tomatoes, setTomatoes] = useState<Food>({
    type: FoodType.Tomato,
    points: 5,
    count: 2,
    image: "https://i.ibb.co/WyksYrk/tomato-clear.png",
  });
  const [cakeSlices, setCakeSlices] = useState<Food>({
    type: FoodType.CakeSlice,
    points: 15,
    count: 2,
    image: "https://i.ibb.co/bgryPmB/cake.png",
  });
  const [cake, setCake] = useState<Food>({
    type: FoodType.Cake,
    points: 100,
    count: 2,
    image: "https://i.ibb.co/gmZZMDB/fullcake.png",
  });

  // uncomment to clear things for testing

  // chrome.storage.local.clear(function () {
  //   var error = chrome.runtime.lastError;
  //   if (error) {
  //     console.error(error);
  //   }
  //   // do something more
  // });
  // chrome.storage.sync.clear();

  // TOMATOES: retrieve stored value at init + track changes/update chrome storage

  useEffect(() => {
    chrome.storage.sync.get("iTomato", (result) => {
      if (result.iTomato == null) {
        chrome.storage.sync.set({ iTomato: 2 }, () => {
          // console.log("made new tomato counter");
        });
      } else {
        setTomatoes({ ...tomatoes, count: parseInt(result.iTomato) });
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ iTomato: tomatoes.count }, () => {
      console.log("Updated tomato count: " + tomatoes.count);
    });
  });

  // SLICES: retrieve stored value at init + track changes/update chrome storage

  useEffect(() => {
    chrome.storage.sync.get("iSlice", (result) => {
      if (result.iSlice == null) {
        chrome.storage.sync.set({ iSlice: 2 }, () => {
          // console.log("made new slice counter");
        });
      } else {
        setCakeSlices({ ...cakeSlices, count: parseInt(result.iSlice) });
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ iSlice: cakeSlices.count }, () => {
      // console.log('Updated slice count: ' + cakeSlices.count);
    });
  });

  // CAKE: retrieve stored value at init + track changes/update chrome storage

  useEffect(() => {
    chrome.storage.sync.get("iCake", (result) => {
      if (result.iCake == null) {
        chrome.storage.sync.set({ iCake: 2 }, () => {
          // console.log("made new cake counter");
        });
      } else {
        setCake({ ...cake, count: parseInt(result.iCake) });
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ iCake: cake.count }, () => {
      // console.log('Updated cake count: ' + cake.count);
    });
  });

  // make state for current chosen food
  const [chooseFood, setChooseFood] = useState(tomatoes);

  // handle tomato count
  const increaseTomatoes = () => {
    setTomatoes({
      ...tomatoes,
      count: tomatoes.count + 1,
    });
  };
  const decreaseTomatoes = () => {
    if (tomatoes.count != 0) {
      setTomatoes({
        ...tomatoes,
        count: tomatoes.count - 1,
      });
      return true;
    }
    return false;
  };

  // handle cake slice count
  const increaseCakeSlice = () => {
    setCakeSlices({
      ...cakeSlices,
      count: cakeSlices.count + 1,
    });
  };
  const decreaseCakeSlice = () => {
    if (cakeSlices.count != 0) {
      setCakeSlices({
        ...cakeSlices,
        count: cakeSlices.count - 1,
      });
      return true;
    }
    return false;
  };

  // handle cake count
  const increaseCake = () => {
    setCake({
      ...cake,
      count: cake.count + 1,
    });
  };
  const decreaseCake = () => {
    if (cake.count != 0) {
      setCake({
        ...cake,
        count: cake.count - 1,
      });
      return true;
    }
    return false;
  };
  
  const updateFood = () => {
    chrome.storage.sync.get(["duration"], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving duration data:', chrome.runtime.lastError);
      } else {
        console.log('Retrieved duration data:', result.duration);
        // Use the retrieved duration data here
        const currentDuration = result.duration || 0;
  
        if (currentDuration >= 15 && currentDuration < 45) {
          increaseTomatoes();
        } else if (currentDuration >= 45 && currentDuration <= 90) {
          increaseCakeSlice();
        } 
    
      }
    });
  }

  const increaseHealth = (hp: number) => {
    chrome.storage.sync.get(["health"], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving health data:', chrome.runtime.lastError);
      } else {
        console.log('Retrieved health data:', result.health);
        // Use the retrieved health data here
        const currentHealth = result.health || 0;
        // const newHealth = Math.max(currentHealth + hp, 100);
        let newHealth = currentHealth + hp
        if (newHealth > 100){
          const xp = Math.max(newHealth - 100, 0)
          console.log("hp", hp)
          console.log("newhealth", newHealth)
          if (xp > 0) {
            console.log("called increase xp")
            increaseXP(xp)
          }
          newHealth = 100
        }

        chrome.storage.sync.set({ "health": newHealth }, () => {
          console.log("Health increased to", newHealth);
        });
      }
    });
  };

  const increaseXP = (xp: number) => {
    chrome.storage.sync.get(["xp"], (result) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving XP data:', chrome.runtime.lastError);
      } else {
        console.log('Retrieved XP data:', result.xp);
        // Use the retrieved health data here
        const currXP = result.xp || 0;
        const newXP = currXP + xp;

        chrome.storage.sync.set({ "xp": newXP }, () => {
          console.log("XP increased to", newXP);
        });
      }
    });
  }
  // decrease count of current chosen food
  const feed = (foodType: FoodType) => {
    switch (foodType) {
      case FoodType.Tomato:
        decreaseTomatoes();
        increaseHealth(5);
        break;
      case FoodType.CakeSlice:
        decreaseCakeSlice();
        increaseHealth(15);
        break;
      case FoodType.Cake:
        decreaseCake();
        increaseHealth(100);
        break;
      default:
        break;
    }
  };
  

  return (
    <>
      <div className="buttongroup">
        <button className="foodbutton" onClick={() => feed(FoodType.Tomato)}>
          <FoodComponent food={tomatoes} selected={chooseFood} />
        </button>
        <button
          className="foodbutton"
          onClick={() => feed(FoodType.CakeSlice)}
        >
          <FoodComponent food={cakeSlices} selected={chooseFood} />
        </button>
        <button className="foodbutton" onClick={() => feed(FoodType.Cake)}>
          <FoodComponent food={cake} selected={chooseFood} />
        </button>
      </div>
    </>
  );
};

export default Inventory;

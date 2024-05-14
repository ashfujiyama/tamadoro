// to dos: feed function needs to increase hp, change feed to decrcease

import React, { useEffect, useState } from "react";
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

  // uncomment to clear things for testing

  // chrome.storage.local.clear(function() {
  //   var error = chrome.runtime.lastError;
  //   if (error) {
  //       console.error(error);
  //   }
  //   // do something more
  // });
  // chrome.storage.sync.clear();

  // TOMATOES: retrieve stored value at init + track changes/update chrome storage

  useEffect(() => {
    chrome.storage.sync.get("iTomato", (result) => {
      if (result.iTomato == null) {
        chrome.storage.sync.set({"iTomato": 0}, () => {
          // console.log("made new tomato counter");
        });
      } else {
        setTomatoes({...tomatoes,
          count: parseInt(result.iTomato)})
      }
    });
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({"iTomato": tomatoes.count}, () => {
              // console.log('Updated tomato count: ' + tomatoes.count);
            })
  })

  // SLICES: retrieve stored value at init + track changes/update chrome storage

  useEffect(() => {
    chrome.storage.sync.get("iSlice", (result) => {
      if (result.iSlice == null) {
        chrome.storage.sync.set({"iSlice": 0}, () => {
          // console.log("made new slice counter");
        });
      } else {
        setCakeSlices({...cakeSlices,
          count: parseInt(result.iSlice)})
      }
    });
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({"iSlice": cakeSlices.count}, () => {
              // console.log('Updated slice count: ' + cakeSlices.count);
            })
  })

  // CAKE: retrieve stored value at init + track changes/update chrome storage

  useEffect(() => {
    chrome.storage.sync.get("iCake", (result) => {
      if (result.iCake == null) {
        chrome.storage.sync.set({"iCake": 0}, () => {
          // console.log("made new cake counter");
        });
      } else {
        setCake({...cake,
          count: parseInt(result.iCake)})
      }
    });
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({"iCake": cake.count}, () => {
              // console.log('Updated cake count: ' + cake.count);
            })
  })

  // make state for current chosen food
  const [chooseFood, setChooseFood] = useState(tomatoes);

  // handle tomato count
  const increaseTomatoes = () => {
    setTomatoes({
      ...tomatoes,
      count: tomatoes.count + 1
    });
  };
  const decreaseTomatoes = () => {
    if (tomatoes.count != 0) {
      setTomatoes({
        ...tomatoes,
        count: tomatoes.count - 1
      });
    }
  };

  // handle cake slice count
  const increaseCakeSlice = () => {
    setCakeSlices({
      ...cakeSlices,
      count: cakeSlices.count + 1
    });
  };
  const decreaseCakeSlice = () => {
    if (cakeSlices.count != 0) {
      setCakeSlices({
        ...cakeSlices,
        count: cakeSlices.count - 1
      });
    }
  };

  // handle cake count
  const increaseCake = () => {
    setCake({
      ...cake,
      count: cake.count + 1
    });
  };
  const decreaseCake = () => {
    if (cake.count != 0) {
      setCake({
        ...cake,
        count: cake.count - 1
      });
    }
  };

  // decrease count of current chosen food
  const feed = () => {
    switch (chooseFood.type) {
      case "Tomato":
        // increaseTomatoes();
        decreaseTomatoes();
        break;
      case "Cake Slice":
        // increaseCakeSlice();
        decreaseCakeSlice();
        break;
      case "Cake":
        // increaseCake();
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

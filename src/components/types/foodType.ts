export enum FoodType {
  Tomato = "Tomato",
  CakeSlice = "Cake Slice",
  Cake = "Cake"
}

export interface Food {
  type: FoodType;
  points: number;
  count: number;
  image: string
}

export const increaseFoodCount = (food: Food): Food => {
  return {
    ...food,
    count: food.count + 1
  };
};

export const decreaseFoodCount = (food: Food): Food => {
  if (food.count > 0) { // only decrease if food count > 0
    return {
      ...food,
      count: food.count - 1
    };
  }
  return food;
};
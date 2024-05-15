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
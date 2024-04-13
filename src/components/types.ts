export interface Task {
  name: string;
  dailyProgress: number;
  dailyGoal: number;
  complete: boolean;
}

export interface Pet {
  name: string;
  health: number;
  level: number;
}

export enum FoodType {
  Tomato = 5,
  CakeSlice = 15,
  Cake = 100
}

export interface Food {
  type: FoodType;
  count: number;
}

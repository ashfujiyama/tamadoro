interface Task {
  name: string;
  dailyProgress: number;
  dailyGoal: number;
  complete: boolean;
}

interface Pet {
  name: string;
  health: number;
  level: number;
}

interface Food {
  name: string;
  points: number;
  count: number;
}

export type { Task, Pet, Food };

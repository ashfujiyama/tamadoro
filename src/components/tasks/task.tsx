import { SetStateAction, useState } from "react";
import Task from "../types";

// one task: task name, current daily progress, checked if daily goal is complete, button to edit by opening task form

// const Task = (task: Task) => {
const Task = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onClickTask = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div>
      <p>task: {selectedTask?.name} taskName</p>
      <p>
        today's progress: {selectedTask?.dailyProgress}0 /
        {selectedTask?.dailyGoal} 10
      </p>
    </div>
  );
};

export default Task;

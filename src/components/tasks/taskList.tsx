// display container of tasks + collapsible task form for new ones

import Task from "./task";
import TaskForm from "./taskForm";

const TaskList = () => {
  return (
    <>
      <Task />
      <TaskForm />
    </>
  );
};

export default TaskList;

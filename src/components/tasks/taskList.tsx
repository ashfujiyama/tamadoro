// display container of tasks + collapsible task form for new ones

// needs to get and iterate over task array from local storage with each task as in put for <Task>

import { useState } from "react";
import Task from "./task";
import TaskForm from "./taskForm";

const TaskList = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  // turns off and on form visinility
  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  return (
    <>
      <Task />
      <div className="collapsible-container">
        <button className="collapsible-header" onClick={toggleFormVisibility}>
          Add Task
        </button>
        {isFormVisible && (
          <div className="collapsible-content">
            <TaskForm />
          </div>
        )}
      </div>
    </>
  );
};

export default TaskList;

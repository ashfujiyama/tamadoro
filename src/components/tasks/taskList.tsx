import { useEffect, useState } from "react";
import Task from "./task";
import TaskForm from "./taskForm";

const TaskList = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // turns off and on form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  // displays the task list stored in chrome
  useEffect(() => {
    chrome.storage.sync.get("taskList", (result) => {
      if (result.taskList !== null) {
        setTaskList(result.taskList);
      }
    });
  }, []); // Empty dependency array to run the effect once

  // chooses current task to complete
  const onClickTask = (task: Task) => {
    setSelectedTask(task);
  };

  // removes task
  const removeTask = (taskName: string) => {
    const updatedTaskList = taskList.filter((task) => task.name !== taskName);
    setTaskList(updatedTaskList);

    chrome.storage.sync.set({ taskList: updatedTaskList });
  };

  return (
    <>
      {taskList.map((task, index) => (
        <div key={task.name}>
          {" "}
          {/* Added key prop */}
          <p>{task.name}</p>
          {selectedTask === task && <p>this task is selected</p>}
          <p>
            today's progress: {task.dailyProgress} / {task.dailyGoal}
          </p>
          <button onClick={() => onClickTask(task)}>select</button>
          <button onClick={() => removeTask(task.name)}>delete</button>
        </div>
      ))}
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

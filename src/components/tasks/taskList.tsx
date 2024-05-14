import { useEffect, useState } from "react";
import TaskForm from "./taskForm";
import { Task } from "../types";

const TaskList = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Function to update task list state
  const updateTaskListState = () => {
    chrome.storage.sync.get(["taskList"], (result) => {
      if (result.taskList) {
        setTaskList(result.taskList);
      }
    });
  };

  // Turns off and on form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible((prevState) => !prevState);
  };

  // Displays the task list stored in Chrome
  useEffect(() => {
    updateTaskListState(); // Load saved task list

    // Add event listener for changes in Chrome storage
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes["taskList"]) {
        updateTaskListState(); // Update task list state when taskList changes
      }
    });

    // Clean up event listener when component unmounts
    return () => {
      chrome.storage.onChanged.removeListener((changes, namespace) => {
        if (changes["taskList"]) {
          updateTaskListState(); // Update task list state when taskList changes
        }
      });
    };
  }, []);

  useEffect(() => {
    // Function to compare deadline with current time
    const checkDeadline = () => {
      // chrome.storage.sync.set({ deadline: new Date() }, () => {
      //   console.log("set deadline to: ", new Date());
      // });
      chrome.storage.sync.get("deadline", (result) => {
        if (result.deadline) {
          const currentTime = new Date();
          const deadlineTime = new Date(result.deadline);

          if (currentTime >= deadlineTime) {
            console.log("Deadline has passed.");
            timerComplete();
          } else {
            const deadlineDate = new Date(result.deadline);
            console.log("Deadline is in the future: " + isNaN(result.deadline));

            console.log("curr time = " + currentTime);
          }
        } else {
          console.log("No deadline found in Chrome storage.");
        }
      });
    };

    // Run checkDeadline function
    checkDeadline();

    // Run the function every 5 seconds to check for deadline completion
    const intervalId = setInterval(checkDeadline, 5000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const checkStorageAtMidnight = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        resetProgress();
      }
    };

    // Run the function every minute to check for midnight
    const intervalId = setInterval(checkStorageAtMidnight, 60000);
    // const intervalId = setInterval(checkStorageAtMidnight, 3600000);

    // Clean up interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const resetProgress = () => {
    console.log("Resetting progress...");

    chrome.storage.sync.get(["taskList"], (result: { taskList?: Task[] }) => {
      if (result.taskList) {
        const updatedTaskList = result.taskList.map((task) => ({
          ...task,
          dailyProgress: 0,
        }));

        // Update taskList in Chrome storage
        chrome.storage.sync.set({ taskList: updatedTaskList }, () => {
          console.log("Task list updated in Chrome storage:", updatedTaskList);
          setTaskList(updatedTaskList);
        });
      }
    });
  };

  // Chooses current task to complete
  const onClickTask = (task: Task) => {
    setSelectedTask(task);
  };

  // Removes task
  const removeTask = (taskName: string) => {
    const updatedTaskList = taskList.filter((task) => task.name !== taskName);
    setTaskList(updatedTaskList);

    chrome.storage.sync.set({ taskList: updatedTaskList });
  };

  // when a timer is complete, add progress
  const timerComplete = () => {
    chrome.storage.sync.get(["duration"], (result) => {
      if (result.duration) {
        if (selectedTask && taskList != null) {
          const updatedTaskList = taskList.map((task) => {
            if (task.name === selectedTask.name) {
              return {
                ...task,
                dailyProgress: task.dailyProgress + result.duration,
              };
            }
            return task;
          });

          setTaskList(updatedTaskList);
          chrome.storage.sync.set({ taskList: updatedTaskList });
        }
      }
    });
  };

  return (
    <>
      <button onClick={() => timerComplete()}>timer complete</button>
      {taskList?.map((task, index) => (
        <div key={task.name}>
          {" "}
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

import { useForm, SubmitHandler } from "react-hook-form";
import "./taskStyle.css";

export interface Task {
  name: string;
  dailyProgress: number;
  dailyGoal: number;
  complete: boolean;
}

// Interface for the form inputs, assuming dailyProgress starts at 0 for new tasks and complete is false
interface IFormInput {
  name: string;
  hours: number; // Daily goal in hours
  minutes: number; // Daily goal in minutes
}

const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    const time = formData.hours * 60;
    const newTask: Task = {
      name: formData.name,
      dailyProgress: 0,
      dailyGoal: time + +formData.minutes,
      complete: false,
    };
    console.log(newTask);
    chrome.storage.sync.get(["taskList"], (result) => {
      if (result) {
        // const taskList = result.taskList ?? [];
        const updatedTaskList = [...result.taskList, newTask];
        chrome.storage.sync.set({ taskList: updatedTaskList }, () => {
          console.log("Task list updated:", updatedTaskList);
        });
      } else {
        const updatedTaskList = [newTask];
        chrome.storage.sync.set({ taskList: updatedTaskList }, () => {
          console.log("Task list updated:", updatedTaskList);
        });
      }
    });
    reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="projectTitleInput"
        {...register("name", { required: true, maxLength: 20 })}
        placeholder="Project Title"
      />
      <div className="input-with-label">
        <input
          type="number"
          className="time-input"
          {...register("hours", { min: 0, max: 24 })}
          placeholder="HH"
        />
        <span>:</span>
        <input
          type="number"
          className="time-input"
          {...register("minutes", { min: 0, max: 59 })}
          placeholder="MM"
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default TaskForm;

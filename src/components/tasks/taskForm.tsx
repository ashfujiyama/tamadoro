// add task needs to modify local storage

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./taskStyle.css";

// import Task from "../types";

interface IFormInput {
  taskName: string;
  dailyGoal: number;
}

// form to keep track of and submit new tasks entered
const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>(); // Specify the type for useForm

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    console.log(formData);
    reset();
  };

  return (
    <form className = "taskForm" onSubmit={handleSubmit(onSubmit)}>
      <input className = "projectTitleInput"
        {...(register("taskName"), { required: true, maxLength: 20 })}
        placeholder="Project Title"
      />
      <div className="input-with-label">
        <input
          type="number"
          className="time-input"
          {...register("dailyGoal", { min: 1, max: 24 })}
          placeholder="HH"
        />
        <span>:</span>
        <input
          type="number"
          className="time-input"
          {...register("dailyGoal", { min: 0, max: 59 })}
          placeholder="MM"
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default TaskForm;

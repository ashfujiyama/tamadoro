// add task needs to modify local storage

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...(register("taskName"), { required: true, maxLength: 20 })}
        placeholder="Task Name"
      />
      <div className="input-with-label">
        <input
          type="number"
          {...register("dailyGoal", { min: 1, max: 24 })}
          placeholder="Daily Goal"
        />
        <span>hours</span>
      </div>
      <input type="submit" />
    </form>
  );
};

export default TaskForm;

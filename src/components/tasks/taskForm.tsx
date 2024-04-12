// add task needs to modify local storage

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import Task from "../types";

interface IFormInput {
  taskName: string;
  dailyGoal: number;
}

const TaskForm = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>(); // Specify the type for useForm
  const [data, setData] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
    console.log(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("taskName")} placeholder="Task Name" />
      <input {...register("dailyGoal")} placeholder="Daily Goal" />
      <p>{data}</p>
      <input type="submit" />
    </form>
  );
};

export default TaskForm;

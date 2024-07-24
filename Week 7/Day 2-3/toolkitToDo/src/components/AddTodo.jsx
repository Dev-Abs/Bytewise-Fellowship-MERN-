import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/todo/todoSlice";

const AddTodo = () => {
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const addTodoHandler = (e) => {
      e.preventDefault();
      // dispatch an action to add a todo
    //   dispatch({
    //     type: "todos/addTodo",
    //     payload: {
    //       title: input,
    //     },
    //   });
    dispatch(addTask(input));
      setInput("");
    };

  return (
    // Add a form element with a text input and a submit button, using tailwind classes to style the form, extra beautification
    <form onSubmit={addTodoHandler} className="flex justify-center items-center mt-4 gap-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-[70%] p-2 rounded-l"
      />
      <button
        type="submit"
        className="bg-zinc-800 text-white p-2 rounded-r"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;

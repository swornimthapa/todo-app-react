import React, { useState } from "react";
import {
  removeTodo,
  updateIsCompleted,
  updateTodo,
} from "../features/TodoSlice";
import { useDispatch } from "react-redux";

function TodoItems({ todo }) {
  const dispatch = useDispatch();
  const [todoMsg, setTodoMsg] = useState(todo.todoMsg);
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const toggleCompleted = () => {
    dispatch(updateIsCompleted(todo.id));
  };
  const editTodo = () => {
    dispatch(updateTodo({ id: todo.id, todoMsg: todoMsg }));
    setIsTodoEditable(false);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.isCompleted}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.isCompleted ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.isCompleted) return;

          if (isTodoEditable) {
            editTodo(); //should call update function form todoSlice
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.isCompleted}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => dispatch(removeTodo(todo.id))} //should Call remove function form todoSlice
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItems;

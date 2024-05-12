import TodoForm from "./Components/TodoForm";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import TodoItems from "./Components/TodoItems";
import { useEffect } from "react";
import { addFromLocalStorage } from "./features/TodoSlice";

function App() {
  const todos = useSelector((state) => state.todos || []);

  const dispatch = useDispatch();
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      dispatch(addFromLocalStorage(todos));
    }
  }, []);

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div className="w-full" key={todo.id}>
              <TodoItems todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

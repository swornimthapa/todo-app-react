import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    // {
    //   id: 1,
    //   todoMsg: "this is the first todo",
    //   isCompleted: false,
    // },
  ],
};

function addToLocalStorage(state) {
  window.localStorage.setItem("todos", JSON.stringify(state.todos));
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        todoMsg: action.payload,
        isCompleted: false,
      };
      state.todos.push(todo);
      addToLocalStorage(state);
    },

    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        (currentTodo) => currentTodo.id !== action.payload
      );
      addToLocalStorage(state);
    },

    updateTodo: (state, action) => {
      state.todos = state.todos.map((currentTodo) =>
        currentTodo.id === action.payload.id
          ? { ...currentTodo, todoMsg: action.payload.todoMsg }
          : currentTodo
      );
      addToLocalStorage(state);
    },

    updateIsCompleted: (state, action) => {
      state.todos = state.todos.map((currentTodo) =>
        currentTodo.id === action.payload
          ? { ...currentTodo, isCompleted: !currentTodo.isCompleted }
          : currentTodo
      );
      addToLocalStorage(state);
    },

    addFromLocalStorage: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  updateIsCompleted,
  addFromLocalStorage,
} = todoSlice.actions;

export default todoSlice.reducer;

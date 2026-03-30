// src/store/todosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const todosSlice = createSlice({
  name: "todos",
  initialState: JSON.parse(localStorage.getItem("todos")) || [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.title,
        description: action.payload.description || "",
        isCompleted: false,
      };
      state.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      const filtered = state.filter((t) => t.id !== action.payload.id);
      localStorage.setItem("todos", JSON.stringify(filtered));
      return filtered;
    },
    updateTodo: (state, action) => {
      const updated = state.map((t) =>
        t.id === action.payload.id
          ? { ...t, title: action.payload.title, description: action.payload.description }
          : t
      );
      localStorage.setItem("todos", JSON.stringify(updated));
      return updated;
    },
    toggleCompleted: (state, action) => {
      const updated = state.map((t) =>
        t.id === action.payload.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      localStorage.setItem("todos", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, toggleCompleted } = todosSlice.actions;
export default todosSlice.reducer;
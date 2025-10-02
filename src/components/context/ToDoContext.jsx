import React, { createContext, useContext, useEffect, useState } from "react";

const ToDoContext = createContext();

export default function ToDoContextProvider({ children }) {
  const [taskItems, setTaskItems] = useState(() => {
    try {
      const savedToDo = localStorage.getItem("toDoList");
      return savedToDo ? JSON.parse(savedToDo) : [];
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("toDoList", JSON.stringify(taskItems));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [taskItems]);

  const addToTask = (task) => {
    if (task && task.trim() !== "") {
      setTaskItems([...taskItems, { text: task.trim(), checked: false }]);
    }
  };

  const updateTask = (index, updatedTask) => {
    if (updatedTask && updatedTask.trim() !== "") {
      const savedToDo = [...taskItems];
      savedToDo[index].text = updatedTask.trim();
      setTaskItems(savedToDo);
    }
  };

  const RemoveFromList = (index) => {
    setTaskItems((items) => items.filter((_, i) => i !== index));
  };

  const toggleTask = (index) => {
    const savedToDo = [...taskItems];
    savedToDo[index].checked = !savedToDo[index].checked;
    setTaskItems(savedToDo);
  };

  const clearAllTasks = () => {
    setTaskItems([]);
  };

  const value = {
    taskItems,
    setTaskItems,
    addToTask,
    RemoveFromList,
    updateTask,
    toggleTask,
    clearAllTasks,
  };

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>;
}

export const useTask = () => {
  return useContext(ToDoContext);
};

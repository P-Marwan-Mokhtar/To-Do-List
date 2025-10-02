import React, { useState } from "react";
import { useTask } from "./context/ToDoContext";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const AllTasks = ({ filterType }) => {
  const { taskItems, RemoveFromList, updateTask, toggleTask } = useTask();
  const [editValue, setEditValue] = useState("");
  const [isIndex, setIsIndex] = useState(-1);

  const handleEdit = (index, task) => {
    setIsIndex(index);
    setEditValue(task.text);
  };

  const saveEdit = (index) => {
    if (editValue.trim() !== "") {
      updateTask(index, editValue);
    }
    setIsIndex(-1);
    setEditValue("");
  };

  const cancelEdit = () => {
    setIsIndex(-1);
    setEditValue("");
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const filteredTasks = taskItems.filter((task) => {
    if (filterType === "Checked Tasks") {
      return task.checked;
    } else if (filterType === "Unchecked Tasks") {
      return !task.checked;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-4">
      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500 text-xl py-8">
          {filterType === "Checked Tasks"
            ? "No completed tasks yet"
            : filterType === "Unchecked Tasks"
            ? "No pending tasks"
            : "No tasks yet"}
        </div>
      ) : (
        filteredTasks.map((task, index) => {
          return (
            <div
              key={index}
              className={`w-full p-4 flex items-center justify-between rounded-2xl text-xl transition-all duration-200 ${
                task.checked ? "bg-green-100 " : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <div className="flex gap-5 items-center">
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => toggleTask(index)}
                  className="w-5 h-5 cursor-pointer"
                />
                {isIndex === index ? (
                  <input
                    value={editValue}
                    autoFocus
                    className="pl-5 py-1 border border-gray-300 rounded"
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onBlur={() => saveEdit(index)}
                  />
                ) : (
                  <span
                    className={task.checked ? "line-through text-gray-500" : ""}
                  >
                    {task.text}
                  </span>
                )}
              </div>
              {isIndex === index ? (
                <div className="flex gap-4">
                  <button
                    onClick={cancelEdit}
                    className="w-[120px] bg-red-700 hover:bg-red-600 transition-all duration-200 cursor-pointer text-white h-[40px] rounded-[10px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => saveEdit(index)}
                    className="w-[120px] bg-green-700 hover:bg-green-500 transition-all duration-200 cursor-pointer text-white h-[40px] rounded-[10px]"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(index, task)}
                    className="bg-gray-600 p-[10px] rounded-xl text-white hover:scale-110 transition-all duration-200 cursor-pointer"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => RemoveFromList(index)}
                    className="bg-gray-600 p-[10px] text-white hover:scale-110 rounded-xl transition-all duration-200 cursor-pointer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllTasks;

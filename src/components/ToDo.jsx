import React, { useRef, useState } from "react";
import { useTask } from "./context/ToDoContext";
import AllTasks from "./AllTasks";

const ToDo = () => {
  const { addToTask, clearAllTasks } = useTask();
  const input = useRef();
  const [inputValue, setInputValue] = useState("");
  const [isIndex, setIsIndex] = useState(0);
  const btns = ["All Tasks", "Checked Tasks", "Unchecked Tasks"];

  const handleAddToTask = () => {
    if (inputValue.trim() !== "") {
      addToTask(inputValue);
      setInputValue("");
      if (input.current) {
        input.current.value = "";
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddToTask();
    }
  };

  return (
    <section>
      <div className="container pt-[150px] flex items-center justify-center">
        <div className="w-[1000px] justify-center p-11 items-center border-2 rounded-2xl animate-borderChange  transition-all duration-200">
          <div className="flex flex-col items-center">
            <div className="flex justify-center w-full mb-5">
              <h1 className="text-[50px] font-bold text-cyan-500 cursor-pointer transition-all duration-200">
                ToDo-List
              </h1>
            </div>
            <div className="flex flex-col w-full gap-7">
              <div className="flex gap-5">
                <input
                  ref={input}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  type="text"
                  className="w-full pl-[15px] text-[20px] py-1 rounded-2xl border-[1px] border-cyan-500 outline-none"
                  placeholder="Add Your Task"
                  value={inputValue}
                />
                <button
                  onClick={handleAddToTask}
                  className="rounded-2xl cursor-pointer bg-cyan-500 hover:bg-cyan-300 transition-all duration-200 text-white h-[50px] text-2xl flex items-center justify-center w-[200px]"
                >
                  Add
                </button>
              </div>
              <div className="mb-10 flex justify-between gap-5">
                <div className="flex gap-4">
                  {btns.map((btn, index) => (
                    <button
                      key={index}
                      className={` btn   rounded-2xl bg-gray-600 text-white hover:bg-gray-700 transition-all duration-200 ${
                        isIndex === index ? "!bg-gray-800" : ""
                      }`}
                      onClick={() => setIsIndex(index)}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
                <div>
                  <button
                    onClick={clearAllTasks}
                    className="btn rounded-2xl cursor-pointer !bg-red-500 hover:bg-red-400 transition-all duration-200 text-white h-[40px]  "
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
            <AllTasks filterType={btns[isIndex]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToDo;

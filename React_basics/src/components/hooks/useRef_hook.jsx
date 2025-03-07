import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";

function PrevState() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");//normal variables gets reinitialized everytime of the render
//using useRef the values gets persisted 
//and the value is stored in the current 
//if useState variable changes it re-renders
// if useRef variable changes it will not re-render
//main usuage of useRef is to access a DOM element directly

  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  );
}

export default PrevState
import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ToggleButton.css";

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    if (isToggled) {
      document.querySelector("body").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("body").setAttribute("data-theme", "light");
    }
  };

  return (
    <button onClick={handleToggle} className="toggle-button">
      {isToggled ? (
        <FaSun className="icon" color="orange" size={24} />
      ) : (
        <FaMoon className="icon" color="blue" size={24} />
      )}
      
    </button>
  );
};

export default ToggleButton;

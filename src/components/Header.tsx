import React, { useState } from "react";
import "../style/Header.scss";

interface HeaderProps {
  setBodyScale: any;
  bodyScale: number;
  handleScaleChange: (increment: boolean) => void;
  centerBody: () => void; // Added function
}

const Header: React.FC<HeaderProps> = ({
  setBodyScale,
  bodyScale,
  handleScaleChange,
  centerBody, // Added prop
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(!isOpen);
  };
  

  return (
    <header>
      <div className="left-header"></div>
      <div className="right-header">
        <button>List view</button>
        <button onClick={centerBody}>Center</button> {/* Center button */}
        <button onClick={() => handleScaleChange(true)}>+</button>
        <button className="scale-options-button" onClick={handleButtonClick}>
          {bodyScale}%
        </button>
        {isOpen && (
          <nav className={`scale-active ${isOpen ? "active" : ""}`}>
            <ul className="scale">
              {[25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150].map((scale) => (
                <li
                  className="scale-options"
                  key={scale}
                  onClick={() => setBodyScale(scale)}
                >
                  <span>{scale}%</span>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <button onClick={() => handleScaleChange(false)}>-</button>
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import "./App.scss";
import Board from "./components/Board";

const App: React.FC = () => {
  const [bodyPosition, setBodyPosition] = useState({ x: 0, y: 0 });
  const [bodyScale, setBodyScale] = useState<number>(100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons === 1) {
        handleBodyMove(e.movementX, e.movementY);
      }
    };

    document.body.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleBodyMove = (movementX: number, movementY: number) => {
    setBodyPosition((prev) => ({
      x: prev.x + movementX,
      y: prev.y + movementY,
    }));
  };

  const handleScaleChange = (increment: boolean) => {
    const scaleChange = increment ? 10 : -10;
    setBodyScale((prev) => prev + scaleChange);
  };

  const centerBody = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
  
    const newBodyPosition = {
      x: centerX - (window.innerWidth / (2 * (bodyScale / 100))),
      y: centerY - (window.innerHeight / (2 * (bodyScale / 100))),
    };
  
    setBodyPosition(newBodyPosition);
  };
  

  return (
    <div className="app">
      <Header
        setBodyScale={setBodyScale}
        bodyScale={bodyScale}
        handleScaleChange={handleScaleChange}
        centerBody={centerBody}
      />
      <Board
        bodyPosition={bodyPosition}
        bodyScale={bodyScale}
        handleBodyMove={handleBodyMove}
      />
    </div>
  );
};

export default App;

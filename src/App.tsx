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

  return (
    <div className="app">
      <Header
        setBodyScale={setBodyScale}
        bodyScale={bodyScale}
        handleScaleChange={handleScaleChange}
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

import React from "react";
import { useEffect } from "react";

const Timer = ({ secodnsReamining, dispatch }) => {
  const mins = Math.floor(secodnsReamining / 60);
  const seconds = secodnsReamining % 60;
  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "timer" }), 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return (
    <div>
      <h5 className="timer">
        ⏱️{mins} :{seconds}
      </h5>
    </div>
  );
};

export default Timer;

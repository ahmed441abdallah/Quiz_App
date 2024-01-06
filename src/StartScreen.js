import React from "react";

const StartScreen = ({ questionNumbs, dispatch }) => {
  return (
    <div className="start">
      <h2> Welcome to React Quiz ! 🗒️</h2>
      <h3> {questionNumbs} Questions test of React Mastery ❓</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start 👏
      </button>
    </div>
  );
};

export default StartScreen;

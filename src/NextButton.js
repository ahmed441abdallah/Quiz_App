import React from "react";

const NextButton = ({ answer, dispatch, index }) => {
  const hasNotAnswer = answer === null;
  if (hasNotAnswer) return null;
  if (index < 14)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        NEXT 👉
      </button>
    );
  if (index === 14)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Finish" })}
      >
        Finish
      </button>
    );
};

export default NextButton;

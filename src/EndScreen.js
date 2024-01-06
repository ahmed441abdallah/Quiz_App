import React, { Fragment } from "react";
const EndScreen = ({ dispatch, points, maxPoint, heightScore }) => {
  const percentage = Math.ceil((points / maxPoint) * 100);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 90 && percentage < 100) emoji = "🥈";
  if (percentage < 90 && percentage > 50) emoji = "🤨";
  if (percentage <= 50) emoji = "☹️";
  return (
    <Fragment>
      <p className="result">
        <span> </span> {emoji} You Score <strong> {points}</strong> out of{" "}
        {maxPoint} ({percentage}%)
      </p>
      <p className="highscore">(🔝 highscore : {heightScore} point)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "Restart" })}
      >
        Restart Quiz
      </button>
    </Fragment>
  );
};

export default EndScreen;

import React from "react";

const Progress = ({ index, points, maxPoint, questionNumbs }) => {
  return (
    <header className="progress">
      <p>
        Question{" "}
        <strong>
          {index + 1} / {questionNumbs}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{maxPoint} points ⭐
        </strong>
      </p>
    </header>
  );
};

export default Progress;

import { Fragment, useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Error from "./Error";
import Questions from "./Questions";
import NextButton from "./NextButton";
import EndScreen from "./EndScreen";
import Progress from "./Progress";
import Footer from "./Footer";
import Timer from "./Timer";
function App() {
  const initialSate = {
    questions: [],
    status: "loading", // loading Ready Failed Active Finish
    index: 0,
    answer: null,
    points: 0,
    heightScore: 0,
    secodnsReamining: 300,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed ":
        return {
          ...state,
          status: "failed",
        };
      case "start":
        return {
          ...state,
          status: "start",
        };
      case "newAnswer":
        const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      case "NextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "Finish":
        return {
          ...state,
          status: "finish",
          heightScore:
            state.points > state.heightScore ? state.points : state.heightScore,
        };
      case "Restart":
        return {
          ...state,
          status: "ready", // loading Ready Failed Active Finish
          index: 0,
          answer: null,
          points: 0,
          heightScore: 0,
          secodnsReamining: 300,
        };
      case "timer":
        return {
          ...state,
          secodnsReamining: state.secodnsReamining - 1,
          status: state.secodnsReamining === 0 ? "finish" : state.status,
        };
      default:
        throw new Error("unknown action");
    }
  }
  const [
    { questions, status, index, answer, points, heightScore, secodnsReamining },
    dispatch,
  ] = useReducer(reducer, initialSate);
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  const questionNumbs = questions.length;
  const maxPoint = questions.reduce(
    (prev, cur) => prev + cur.points,

    0
  );
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <Loader></Loader>}
        {status === "ready" && (
          <StartScreen
            questionNumbs={questionNumbs}
            dispatch={dispatch}
          ></StartScreen>
        )}
        {status === "failed" && <Error></Error>}
        {status === "start" && (
          <Fragment>
            <Progress
              index={index}
              maxPoint={maxPoint}
              questionNumbs={questionNumbs}
              points={points}
            ></Progress>
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            ></Questions>
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
              ></NextButton>
              <Timer
                secodnsReamining={secodnsReamining}
                dispatch={dispatch}
              ></Timer>
            </Footer>
          </Fragment>
        )}

        {status === "finish" && (
          <EndScreen
            points={points}
            maxPoint={maxPoint}
            heightScore={heightScore}
            dispatch={dispatch}
          ></EndScreen>
        )}
      </Main>
    </div>
  );
}

export default App;

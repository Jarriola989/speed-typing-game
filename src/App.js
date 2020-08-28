import React, { useState, useEffect, useRef } from "react";

function App() {
  const STARTING_TIME = 5;
  const [typedText, setTypedText] = useState("");
  const [timerStarted, setTimerStarted] = useState(false);
  const [timer, setTimer] = useState(STARTING_TIME);
  const [wordCount, setWordCount] = useState(0);
  const inputRef = useRef(null);

  const handleTypedText = (e) => {
    setTypedText(e.target.value);
  };

  const calculateWordCount = (text) => {
    const wordArray = text
      .trim()
      .split(" ")
      .filter((word) => word !== "");
    return wordArray.length;
  };

  const startGame = () => {
    setTimerStarted(true);
    setTimer(STARTING_TIME);
    setTypedText("");
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const endGame = () => {
    setTimerStarted(false);
    const wordNum = calculateWordCount(typedText);
    setWordCount(wordNum);
  };

  useEffect(() => {
    if (timer > 0 && timerStarted) {
      setTimeout(() => setTimer((prevTime) => prevTime - 1), 1000);
    } else {
      endGame();
    }
  }, [timerStarted, timer]);

  return (
    <div className="App">
      <h2>Speed Typing</h2>
      <textarea
        onChange={handleTypedText}
        value={typedText}
        disabled={!timerStarted}
        ref={inputRef}
      />
      <h4>Time remaining: {timer}s</h4>
      <button onClick={startGame} disabled={timerStarted}>
        Start Game
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;

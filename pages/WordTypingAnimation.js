import React, { useState, useEffect, useRef } from "react";
import QuestionComponent from "./QuestionComponent";

const WordTypingAnimation = ({ text, speed, questions, setInputValue }) => {
  const words = text.split(" ");
  const [visibleWords, setVisibleWords] = useState([]);
  const [blinkCursor, setBlinkCursor] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndexRef.current !== words.length &&
        setVisibleWords((prevVisibleWords) => {
          const updatedVisibleWords = [
            ...prevVisibleWords,
            words[currentIndexRef.current],
          ];
          currentIndexRef.current++;

          setBlinkCursor(true);

          if (currentIndexRef.current === words.length) {
            setBlinkCursor(false);
            clearInterval(interval);
            setAnimationComplete(true); // Animation is complete
          }

          return updatedVisibleWords;
        });
    }, speed);

    return () => clearInterval(interval);
  }, [speed, words]);

  return (
    <div>
      <p className="typing-text">
        {visibleWords.join(" ")}
        {blinkCursor && <span className="blinking-cursor"></span>}
      </p>
      {animationComplete && (
        <QuestionComponent
          questions={questions}
          setInputValue={setInputValue}
        />
      )}
    </div>
  );
};

export default WordTypingAnimation;

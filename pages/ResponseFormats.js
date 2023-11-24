import React, { useState, useEffect } from "react";
import WordTypingAnimation from "./WordTypingAnimation";

const AnswerComponent = ({ answer, questions, setInputValue }) => (
  <div className="bot-response format-1">
    <p>
      <strong> </strong>
      <WordTypingAnimation
        text={`"${answer}"`}
        speed={200}
        questions={questions}
        setInputValue={setInputValue}
      />
    </p>
  </div>
);

const ResponseFormats = (response, setInputValue) => {
  const { answer, questions } = response;

  return [
    {
      text: (
        <div>
          <AnswerComponent
            answer={answer}
            questions={questions}
            setInputValue={setInputValue}
          />
        </div>
      ),
    },
  ];
};

export default ResponseFormats;

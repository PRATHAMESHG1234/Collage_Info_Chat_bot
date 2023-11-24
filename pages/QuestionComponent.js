import React from "react";
import { Transition } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css"; // Import Semantic UI CSS

const QuestionComponent = ({ questions, setInputValue }) => {
  const handleQuestionClick = (question) => {
    console.log(setInputValue);
    setInputValue(question);
  };

  return (
    <div className="available-questions">
      <h3>Available Questions:</h3>
      <Transition.Group animation="fly down" duration={500}>
        {questions.map((question, index) => (
          <div
            key={index}
            className="question-card"
            onClick={() => handleQuestionClick(question)}
          >
            <p>{question}</p>
          </div>
        ))}
      </Transition.Group>
    </div>
  );
};

export default QuestionComponent;

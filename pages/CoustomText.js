import React from "react";
import WordTypingAnimation from "./WordTypingAnimation"; // Import the WordTypingAnimation component

const CustomText = ({ response, selectedResponse, setInputValue }) => {
  const errorMessageText =
    "We encoutered error while processing your request. This could be due to an invalid input or a server issue. Please make sure your input is meaningful and try again. If the problem persists, it might be a technical issue. Please contact our support team for assistance.";
  // Check if there is an error message
  if (response.error) {
    const questions = [
      "Which facilities are available in the college?",
      "How many courses are available?",
      "Does the college provide any scholarships?",
      "Does the college provide placement?",
      "What about fees?",
    ];
    return (
      <div className={`bot-response format-1 error-message`}>
        <p>
          <strong>Error:</strong>{" "}
          <WordTypingAnimation
            text={errorMessageText}
            speed={200}
            setInputValue={setInputValue}
            questions={questions}
          />
        </p>
      </div>
    );
  }

  // If there is no error, render the selected response
  return <>{selectedResponse.text}</>;
};

export default CustomText;

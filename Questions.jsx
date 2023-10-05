import React from "react";

export default function Questions({
  quiz,
  index,
  isRight,
  answers,
  chooseAnswer,
}) {
  const handleAnswerClick = (choice) => {
    chooseAnswer(choice, index);
  };

  const getClassName = (choice) => {
    if (isRight === undefined) return answers === choice ? "clicked" : "";
    if (isRight)
      return answers === choice ? "green-color done" : "hidden-color done";
    return answers === choice
      ? "red-color done"
      : quiz.correct_answer === choice
      ? "green-color done"
      : "hidden-color done";
  };

  return (
    <div className="section">
      <h3 className="question">{quiz.question}</h3>
      <div className="answer">
        {quiz.choices.map((choice, choiceIndex) => (
          <span
            className={getClassName(choice)}
            onClick={() => handleAnswerClick(choice)}
            key={choiceIndex}
          >
            {choice}
          </span>
        ))}
      </div>
    </div>
  );
}

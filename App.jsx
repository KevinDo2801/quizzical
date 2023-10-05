import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { decode } from "html-entities";

const apiUrl = "https://opentdb.com/api.php?amount=10";

export default function App() {
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isRight, setIsRight] = useState([]);
  const [isAnswersChecked, setIsAnswersChecked] = useState(false);

  // Shuffle the array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetch quiz data
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const result = await response.json();
      const newData = result.results.map((quiz) => {
        const choices = shuffleArray([
          quiz.correct_answer,
          ...quiz.incorrect_answers,
        ]).map(decode);
        return {
          ...quiz,
          question: decode(quiz.question),
          correct_answer: decode(quiz.correct_answer),
          choices,
        };
      });
      setData(newData);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const resetQuiz = () => {
    setData([]);
    setAnswers([]);
    setIsRight([]);
    setIsAnswersChecked(false);
    fetchData();
  };

  const chooseAnswer = (answer, index) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = answer;
      return newAnswers;
    });
  };

  const checkAnswers = () => {
    if (data.length !== answers.length) {
      alert("hey answer ALL questions!");
      return;
    }
    const newIsRight = data.map((quiz, index) => {
      return quiz.correct_answer === answers[index];
    });
    setIsRight(newIsRight);
    setIsAnswersChecked(true);
  };
  const displayQuestions = (
    <div className="container">
      <img className="blob_5" src="./src/blob_5.png" alt="" />
      <img className="blob_4" src="./src/blob_4.png" alt="" />
      {data.map((quiz, index) => (
        <Questions
          isRight={isRight[index]}
          answers={answers[index]}
          index={index}
          chooseAnswer={chooseAnswer}
          key={quiz.question}
          quiz={quiz}
        />
      ))}
      {
        <button
          onClick={isAnswersChecked ? resetQuiz : checkAnswers}
          className="check-answer"
        >
          {isAnswersChecked ? "Reset Quiz!" : "check answers!"}
        </button>
      }
    </div>
  );

  return (
    <main>
      {data.length ? (
        displayQuestions
      ) : (
        <div className="no_quiz">
          <h1>Quizzical</h1>
          <p>Some description if needed</p>
          <button onClick={fetchData}>Start Quiz</button>
        </div>
      )}
    </main>
  );
}

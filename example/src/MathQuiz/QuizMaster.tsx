import * as React from 'react';
import { ShowRender } from '../components/ShowRender';
import { askQuestion, QuestionStatus, quizState } from './abstractBrain';

export const QuizMaster = () => {
  const {
    answer,
    status,
    question,
    correctCount,
    incorrectCount,
  } = quizState.useStore();

  const currentQuestion = correctCount + incorrectCount + 1;

  const asked = status === QuestionStatus.asked;
  const correct = status === QuestionStatus.answeredCorrectly;
  const incorrect = status === QuestionStatus.answeredIncorrectly;
  const correctAnswer = question.num1 + question.num2;

  return (
    <div>
      <div className="header">
        <h2>&lt;QuizMaster /&gt;</h2>
        <ShowRender />
      </div>
      <h4>
        {asked && (
          <>
            Question <span data-testid="askedCount">{currentQuestion}</span>
          </>
        )}
        {correct && <span data-testid="correct">{answer} is correct!</span>}
        {incorrect && (
          <span data-testid="incorrect">
            {answer} is incorrect! The correct answer is {correctAnswer}
          </span>
        )}
      </h4>
      <div>
        {asked && (
          <span data-testid="question">
            {question.num1} + {question.num2} = ?
          </span>
        )}
        {!asked && (
          <button data-testid="nextQuestionBtn" onClick={askQuestion}>
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

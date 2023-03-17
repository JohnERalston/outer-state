import * as React from 'react';
import { ShowRender } from '../components/ShowRender';
import { quizState } from './abstractBrain';

export const CorrectAnswerTracker = () => {
  const { correctCount } = quizState.useStore();

  return (
    <div>
      <div className="header">
        <h2>&lt;CorrectAnswerTracker /&gt;</h2>
        <ShowRender />
      </div>
      <h4>
        Correct: <span data-testid="correctCount">{correctCount}</span>
      </h4>
    </div>
  );
};

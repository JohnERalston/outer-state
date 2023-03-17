import * as React from 'react';
import { ShowRender } from '../components/ShowRender';
import { quizState } from './abstractBrain';

export const IncorrectAnswerTracker = () => {
  const { incorrectCount } = quizState.useStore();

  return (
    <div>
      <div className="header">
        <h2>&lt;IncorrectAnswerTracker /&gt;</h2>
        <ShowRender />
      </div>
      <h4>
        Incorrect: <span data-testid="incorrectCount">{incorrectCount}</span>
      </h4>
    </div>
  );
};

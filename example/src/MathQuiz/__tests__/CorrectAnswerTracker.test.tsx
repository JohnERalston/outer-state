import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { quizState } from '../abstractBrain';
import { CorrectAnswerTracker } from '../CorrectAnswerTracker';

jest.mock('../../components/ShowRender');

describe('<CorrectAnswerTracker />', () => {
  it('will render count of correct answers', () => {
    render(<CorrectAnswerTracker />);
    const correctCount = +screen.getByTestId('correctCount').innerHTML;
    expect(quizState.data().correctCount).toBe(correctCount);
    act(() => {
      quizState.updateStore({ correctCount: 9 });
    });
    expect(quizState.data().correctCount).toBe(9);
  });
});

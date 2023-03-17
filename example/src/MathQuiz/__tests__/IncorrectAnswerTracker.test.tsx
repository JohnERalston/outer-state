import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import { quizState } from '../abstractBrain';
import { IncorrectAnswerTracker } from '../IncorrectAnswerTracker';

jest.mock('../../components/ShowRender');

describe('<IncorrectAnswerTracker />', () => {
  it('will render count', () => {
    render(<IncorrectAnswerTracker />);
    const incorrectCount = +screen.getByTestId('incorrectCount').innerHTML;
    expect(quizState.data().incorrectCount).toBe(incorrectCount);
    act(() => {
      quizState.updateStore({ incorrectCount: 1 });
    });
    expect(quizState.data().incorrectCount).toBe(1);
  });
});

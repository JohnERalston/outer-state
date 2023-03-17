import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QuestionStatus, quizState } from '../abstractBrain';
import { QuizMaster } from '../QuizMaster';

jest.mock('../../components/ShowRender');

describe('<QuizMaster />', () => {
  let question = '';
  it('will ask a question', async () => {
    quizState.updateStore({ status: QuestionStatus.asked });
    render(<QuizMaster />);
    expect(+screen.getByTestId('askedCount').innerHTML).toBe(1);
    question = screen.getByTestId('question').innerHTML;
  });
  it('will signal a correct answer', () => {
    quizState.updateStore({ status: QuestionStatus.answeredCorrectly });
    render(<QuizMaster />);
    expect(screen.getByTestId('correct')).toBeDefined();
  });
  it('will signal an incorrect answer', () => {
    quizState.updateStore({ status: QuestionStatus.answeredIncorrectly });
    render(<QuizMaster />);
    expect(screen.getByTestId('incorrect')).toBeDefined();
  });
  it('will ask a new quetion', () => {
    quizState.updateStore({ status: QuestionStatus.answeredIncorrectly });
    render(<QuizMaster />);
    let btn = screen.queryByTestId('nextQuestionBtn');
    fireEvent.click(btn!);
    const newQuestion = screen.getByTestId('question').innerHTML;
    expect(newQuestion !== question).toBe(true);
    expect(+screen.getByTestId('askedCount')).toBeDefined();
    btn = screen.queryByTestId('nextQuestionBtn');
    expect(btn).toBeNull();
  });
});

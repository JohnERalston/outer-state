import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MathQuiz } from '../MathQuiz';
import { askQuestion, quizState } from '../abstractBrain';

jest.mock('../../App.css', () => ({}));
jest.mock('../../components/ShowRender');

describe('<MathQuiz />', () => {
  it('will ask a question by default', () => {
    render(<MathQuiz />);
    expect(screen.getByTestId('askedCount')).toBeDefined();
  });
  it('will answer a question incorrectly', () => {
    askQuestion();
    render(<MathQuiz />);
    let count = +screen.getByTestId('incorrectCount').innerHTML;
    expect(count).toBe(0);
    const ipField = screen.getByTestId('inputField') as HTMLInputElement;
    const { num1, num2 } = quizState.data().question;
    const incorrectAnswer = num1 + num2 + 1;
    fireEvent.change(ipField, { target: { value: incorrectAnswer } });
    expect(ipField.value).toBe(`${incorrectAnswer}`);
    const submitBtn = screen.getByTestId('submitBtn') as HTMLButtonElement;
    fireEvent.click(submitBtn);
    const feedback = screen.getByTestId('incorrect');
    expect(feedback).toBeDefined();
    count = +screen.getByTestId('incorrectCount').innerHTML;
    expect(count).toBe(1);
    expect(submitBtn.disabled).toBe(true);
  });
  it('will answer a question correctly', () => {
    askQuestion();
    render(<MathQuiz />);
    let count = +screen.getByTestId('correctCount').innerHTML;
    expect(count).toBe(0);
    const ipField = screen.getByTestId('inputField') as HTMLInputElement;
    const { num1, num2 } = quizState.data().question;
    const correctAnswer = num1 + num2;
    fireEvent.change(ipField, { target: { value: `${correctAnswer}` } });
    expect(ipField.value).toBe(`${correctAnswer}`);
    const submitBtn = screen.getByTestId('submitBtn') as HTMLButtonElement;
    fireEvent.click(submitBtn);
    const feedback = screen.getByTestId('correct');
    expect(feedback).toBeDefined();
    count = +screen.getByTestId('correctCount').innerHTML;
    expect(count).toBe(1);
    expect(submitBtn.disabled).toBe(true);
  });
});

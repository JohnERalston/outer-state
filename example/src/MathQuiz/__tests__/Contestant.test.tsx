import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Contestant } from '../Contestant';

jest.mock('../../components/ShowRender');

const mockAnswerQuestion = jest.fn();
jest.mock('../abstractBrain', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../abstractBrain'),
    answerQuestion: (value: string) => mockAnswerQuestion(value),
  };
});

describe('<Contestant />', () => {
  it('will render', () => {
    render(<Contestant />);
  });

  it('will flag invalid answer message', () => {
    render(<Contestant />);
    const submitBtn = screen.getByTestId('submitBtn');
    fireEvent.click(submitBtn);
    const erroMsg = screen.getByTestId('validationMsg');
    expect(erroMsg.innerHTML).toBeTruthy();
  });
});

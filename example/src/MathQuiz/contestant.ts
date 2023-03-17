import { createStore } from '../../../src';
import { answerQuestion } from './abstractBrain';

interface AnswerState {
  value: string;
  valid: boolean;
}

export const answerState = createStore<AnswerState>({
  value: '',
  valid: true,
});

export function onChange(e: React.ChangeEvent<HTMLInputElement>) {
  answerState.updateStore({ value: e.target.value, valid: true });
}

function isValid(value: string) {
  return value?.trim() !== '' && Number.isInteger(Number(value));
}

export function onAnswerFormSubmitted(e: any) {
  e.preventDefault();
  answerState.updateStore({
    valid: isValid(answerState.data().value),
  });
  if (answerState.data().valid) {
    answerQuestion(answerState.data().value);
    answerState.updateStore({
      value: '',
    });
  }
}

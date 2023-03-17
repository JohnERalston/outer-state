import { createStore } from '../../../src/index';

interface Question {
  num1: number;
  num2: number;
}

export enum QuestionStatus {
  asked = 'asked',
  answeredCorrectly = 'answeredCorrectly',
  answeredIncorrectly = 'answerdIncorrectly',
}

interface MathQuizItem {
  question: Question;
  answer: string;
  status: QuestionStatus;
}

interface MathQuiz extends MathQuizItem {
  correctCount: number;
  incorrectCount: number;
}

export const quizState = createStore<MathQuiz>({
  ...getNewQuestion(),
  correctCount: 0,
  incorrectCount: 0,
});

export function askQuestion() {
  quizState.updateStore(getNewQuestion());
}

export function answerQuestion(answer: string) {
  const { num1, num2 } = quizState.data().question;
  const correctAnswer = num1 + num2;
  const correct = correctAnswer === +answer;
  if (correct) {
    quizState.updateStore(store => ({
      correctCount: store.correctCount + 1,
      status: QuestionStatus.answeredCorrectly,
      answer,
    }));
  } else {
    quizState.updateStore(store => ({
      incorrectCount: store.incorrectCount + 1,
      status: QuestionStatus.answeredIncorrectly,
      answer,
    }));
  }
}

function getNewQuestion(): MathQuizItem {
  return {
    question: { num1: getRandomNumber(), num2: getRandomNumber() },
    answer: '',
    status: QuestionStatus.asked,
  };
}

function getRandomNumber() {
  const min = 0;
  const max = 100;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

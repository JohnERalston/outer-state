import { answerState, onAnswerFormSubmitted, onChange } from '../contestant';

const mockAnswerQuestion = jest.fn();
jest.mock('../abstractBrain', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../abstractBrain'),
    answerQuestion: (value: string) => mockAnswerQuestion(value),
  };
});

describe('contentant', () => {
  beforeEach(() => {
    answerState.updateStore({ valid: true, value: '' });
    jest.restoreAllMocks();
  });

  describe('onChange', () => {
    it('will update the store value', () => {
      expect(answerState.data().value).toBe('');
      const event = { target: { value: 'Hello' } } as React.ChangeEvent<
        HTMLInputElement
      >;
      onChange(event);
      expect(answerState.data().value).toBe('Hello');
    });
  });
  describe('onAnswerFormSubmitted', () => {
    const preventDefault = jest.fn();
    const submit = () => {
      onAnswerFormSubmitted({ preventDefault });
    };
    const setStoreValue = (value: string) => {
      answerState.updateStore({ value });
    };

    it('will prevent form submit', () => {
      submit();
      expect(preventDefault).toHaveBeenCalledTimes(1);
    });
    it('will flag invalid data', () => {
      setStoreValue('');
      submit();
      expect(answerState.data().valid).toBe(false);
      setStoreValue('not a number');
      submit();
      expect(answerState.data().valid).toBe(false);
      //@ts-ignore
      setStoreValue();
      submit();
      expect(answerState.data().valid).toBe(false);
    });
    it('will handle valid data', () => {
      setStoreValue('0');
      submit();
      expect(answerState.data().valid).toBe(true);
      expect(mockAnswerQuestion).toHaveBeenCalledWith('0');
      expect(answerState.data().value).toBe('');
    });
  });
});

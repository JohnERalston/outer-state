import { __createStore } from '../src/store';

describe('__createStore', () => {
  let store = __createStore();
  beforeEach(() => {
    store = __createStore();
  });
  it('will register functions', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    store.register(fn1, ['key']);
    store.register(fn2, ['key']);
    store.setUpdated(['key']);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
  it('will register a single instance of a function per key', () => {
    const fn1 = jest.fn();
    store.register(fn1, ['key']);
    store.register(fn1, ['key']);
    store.setUpdated(['key']);
    expect(fn1).toHaveBeenCalledTimes(1);
  });
  it('will update once per many keys', () => {
    const fn1 = jest.fn();
    store.register(fn1, ['key1']);
    store.register(fn1, ['key2']);
    store.setUpdated(['key1', 'key2']);
    expect(fn1).toHaveBeenCalledTimes(1);
  });
  it('will unregister functions', () => {
    const fn1 = jest.fn();
    store.register(fn1, ['key1']);
    store.register(fn1, ['key2']);
    store.setUpdated(['key1', 'key2']);
    expect(fn1).toHaveBeenCalledTimes(1);
    fn1.mockReset();
    store.unregister(fn1);
    store.setUpdated(['key1', 'key2']);
    expect(fn1).toHaveBeenCalledTimes(0);
  });
});

import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { createStore } from '../src';

interface TestStore {
  parent: number;
  yellow: number;
  green: number;
}

const [defaultParentVal, defaultYellowVal, defaultGreenVal] = [0, 100, 200];
let testStore = createStore<TestStore>({
  parent: defaultParentVal,
  yellow: defaultYellowVal,
  green: defaultGreenVal,
});
let testStore2 = createStore<TestStore>({
  parent: defaultParentVal,
  yellow: defaultYellowVal,
  green: defaultGreenVal,
});

const testIds = {
  parent: 'parent',
  yellow: 'yellow',
  yellow2: 'yellow2',
  green: 'green',
  y1: 'y1',
  y2: 'y2',
};

const multiStoreRender = jest.fn();
function MultiStore() {
  multiStoreRender();
  const { yellow: yellow1 } = testStore.useStore();
  const { yellow: yellow2 } = testStore2.useStore();
  return (
    <div>
      <div data-testid={testIds.y1}>{yellow1}</div>
      <div data-testid={testIds.y2}>{yellow2}</div>
    </div>
  );
}

const multiValueRender = jest.fn();
function MultiValue() {
  multiValueRender();
  const { yellow, green, parent } = testStore.useStore();
  return (
    <div>
      MultiValue {yellow} {green} {parent}
    </div>
  );
}

const yellowRender = jest.fn();
function Yellow() {
  yellowRender();
  const { yellow } = testStore.useStore();
  return <div data-testid={testIds.yellow}>{yellow}</div>;
}
const yellow2Render = jest.fn();
function Yellow2() {
  yellow2Render();
  const { yellow } = testStore.useStore();
  return <div data-testid={testIds.yellow2}>{yellow}</div>;
}
const greenRender = jest.fn();
function Green() {
  greenRender();
  const { green } = testStore.useStore();
  return <div data-testid={testIds.green}>{green}</div>;
}
const parentRender = jest.fn();
function Parent() {
  parentRender();
  const { parent } = testStore.useStore();
  return (
    <div>
      <div data-testid={testIds.parent}>{parent}</div>
      <Yellow />
      <Yellow2 />
      <Green />
      <MultiValue />
      <MultiStore />
    </div>
  );
}

function ParentWithProps(props: { parent: number }) {
  parentRender();
  const { parent } = testStore.useStore({ parent: props.parent });
  return (
    <div>
      <div data-testid={testIds.parent}>{parent}</div>
      <Yellow />
    </div>
  );
}

describe('outer-state', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    testStore = createStore<TestStore>({
      parent: defaultParentVal,
      yellow: defaultYellowVal,
      green: defaultGreenVal,
    });
    testStore2 = createStore<TestStore>({
      parent: defaultParentVal,
      yellow: defaultYellowVal,
      green: defaultGreenVal,
    });
  });

  const getYellowVal = () => {
    return +screen.getByTestId(testIds.yellow).innerHTML;
  };
  const getYellow2Val = () => {
    return +screen.getByTestId(testIds.yellow2).innerHTML;
  };
  const getGreenVal = () => {
    return +screen.getByTestId(testIds.green).innerHTML;
  };
  const getParentVal = () => {
    return +screen.getByTestId(testIds.parent).innerHTML;
  };
  const getMultiStoreY1 = () => {
    return +screen.getByTestId(testIds.y1).innerHTML;
  };
  const getMultiStoreY2 = () => {
    return +screen.getByTestId(testIds.y2).innerHTML;
  };

  it('will render store value', () => {
    render(<Parent />);
    expect(getParentVal()).toBe(testStore.data().parent);
    expect(getYellowVal()).toBe(testStore.data().yellow);
    expect(getYellow2Val()).toBe(testStore.data().yellow);
    expect(getGreenVal()).toBe(testStore.data().green);
  });

  it('will rerender updated store value', async () => {
    render(<Parent />);
    const yellowVal = testStore.data().yellow;
    expect(getYellowVal()).toBe(testStore.data().yellow);
    act(() => {
      testStore.updateStore(store => ({
        yellow: store.yellow + 1,
      }));
    });
    await waitFor(() => expect(getYellowVal()).toBe(yellowVal + 1));
  });

  it('will rerender updated store value multiple observers', async () => {
    render(<Parent />);
    expect(getYellowVal()).toBe(testStore.data().yellow);
    act(() => {
      testStore.updateStore({ yellow: 5 });
    });
    await waitFor(() => expect(getYellowVal()).toBe(5));
    expect(getYellow2Val()).toBe(5);
  });

  it('will rerender observers only', async () => {
    render(<Parent />);
    expect(parentRender).toHaveBeenCalledTimes(1);
    expect(yellowRender).toHaveBeenCalledTimes(1);
    expect(yellow2Render).toHaveBeenCalledTimes(1);
    expect(greenRender).toHaveBeenCalledTimes(1);
    act(() => {
      testStore.updateStore({ green: 5 });
    });
    await waitFor(() => expect(getGreenVal()).toBe(5));
    expect(parentRender).toHaveBeenCalledTimes(1);
    expect(yellowRender).toHaveBeenCalledTimes(1);
    expect(yellow2Render).toHaveBeenCalledTimes(1);
    expect(greenRender).toHaveBeenCalledTimes(2);
    act(() => {
      testStore.updateStore({ yellow: 20 });
    });
    await waitFor(() => expect(getYellowVal()).toBe(20));
    expect(getYellow2Val()).toBe(20);
    expect(parentRender).toHaveBeenCalledTimes(1);
    expect(yellowRender).toHaveBeenCalledTimes(2);
    expect(yellow2Render).toHaveBeenCalledTimes(2);
    expect(greenRender).toHaveBeenCalledTimes(2);
  });

  it('will ignore unmatched update property keys', async () => {
    render(<Parent />);
    act(() => {
      testStore.updateStore({
        parent: 66,
        yellow: 77,
        green: 88,
        //@ts-ignore
        unmatched: 99,
      });
    });
    await waitFor(() => expect(getYellowVal()).toBe(77));
    expect(getParentVal()).toBe(66);
    expect(getGreenVal()).toBe(88);
  });

  it('will update parent', async () => {
    render(<Parent />);
    act(() => {
      testStore.updateStore({ parent: 88 });
    });
    await waitFor(() => expect(getParentVal()).toBe(88));
  });

  it('will only render once when multiple store values are updated together', async () => {
    render(<Parent />);
    expect(multiValueRender).toHaveBeenCalledTimes(1);
    act(() => {
      testStore.updateStore({ green: 13, yellow: 14, parent: 15 });
    });
    expect(multiValueRender).toHaveBeenCalledTimes(2);
  });

  it('will keep multiple stores mutually exclusive', async () => {
    render(<Parent />);
    expect(multiValueRender).toHaveBeenCalledTimes(1);
    expect(getMultiStoreY1()).toBe(testStore.data().yellow);
    expect(getMultiStoreY2()).toBe(testStore2.data().yellow);
    act(() => {
      testStore.updateStore({ yellow: 140 });
      testStore2.updateStore({ yellow: 1400 });
    });
    expect(multiValueRender).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(getMultiStoreY1()).toBe(140);
    });
    expect(getMultiStoreY2()).toBe(1400);
  });

  it('will yield updated data', () => {
    expect(testStore.data().green).toBe(defaultGreenVal);
    expect(testStore2.data().green).toBe(defaultGreenVal);
    testStore.updateStore({ green: 140 });
    testStore2.updateStore({ green: 1400 });
    expect(testStore.data().green).toBe(140);
    expect(testStore2.data().green).toBe(1400);
  });

  it('will accept initial props once', () => {
    const { rerender } = render(<ParentWithProps parent={900} />);
    expect(getYellowVal()).toBe(defaultYellowVal);
    expect(getParentVal()).toBe(900);
    act(() => {
      testStore.updateStore({ parent: 901, yellow: 902 });
    });
    expect(getYellowVal()).toBe(902);
    expect(getParentVal()).toBe(901);
    expect(parentRender).toHaveBeenCalledTimes(2);

    //ensure initial values are ignored on subsequent renders
    rerender(<ParentWithProps parent={900} />);
    expect(getYellowVal()).toBe(902);
    expect(getParentVal()).toBe(901);
    expect(parentRender).toHaveBeenCalledTimes(3);
  });

  it('will prevent direct store data mutations', () => {
    let thrown = false;
    try {
      //@ts-ignore
      testStore.data().green = 99;
    } catch (e) {
      thrown = true;
    }
    expect(thrown).toBe(true);
  });
});

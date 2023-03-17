# @JohnERalston/stable-state

![Coverage lines](https://img.shields.io/badge/license-MIT-green)

![Coverage lines](https://raw.githubusercontent.com/JohnERalston/stable-state/master/media/badge-lines.svg)
![Coverage functions](https://raw.githubusercontent.com/JohnERalston/stable-state/master/media/badge-functions.svg)
![Coverage branches](https://raw.githubusercontent.com/JohnERalston/stable-state/master/media/badge-branches.svg)
![Coverage statements](https://raw.githubusercontent.com/JohnERalston/stable-state/master/media/badge-statements.svg)

## Stable State

> Write simpler cleaner code faster.

- `Stable State` is an `incredibly simple` yet `incredibly powerful` `state managment` facility for `ReactJS` applications.
- It has a tiny and simple API with a tiny learning curve.
- It helps you to keep 100% of your business logic out of React and into vanella TS files.
- When you do so, complexity is reduced because all need for `useEffect`, `useCallback`, `useMemo`, `useRef` etc. completely dissapear.
- Stable State also facilitates effortless unit testing.
- Just `703B`

## Installation

```bash
yarn add @JohnERalston/stable-state
```

or

```bash
npm install @JohnERalston/stable-state
```

## Basic Usage

```TypeScript
interface TaskTrackerState {
  secondsElapsed: number;
  itemsComplete: string[];
}
```

### Create a store (multiple stores are strongly encouraged)

```TypeScript
@import { createStore } from '@JohnERalston/stable-state';

const taskTrackerState = createStore<TaskTrackerState>({
  secondsElapsed: 0,
  itemsComplete: []
});
```

### Update State

> - Updating state can of course be done inside a custom hook or inside a Component. However, with `Stable State` it can also be done outside or React, in fact this is `strongly encouraged`.
> - Keep 100% of your business logic in vanella TS files outside of React.

#### Functional Variant

```TypeScript
taskTrackerState.updateStore((store) => ({secondsElapsed: store.secondsElapsed + 1}));
```

#### Object Variant

```TypeScript
taskTrackerState.updateStore({secondsElapsed: 23));
```

### Read State (outside of a Component or custom hook)

```TypeScript
const {secondsElapsed, itemsComplete} = taskTrackerState.data();
```

### Read State (inside a Component or custom hook)

> Using `useStore()` will cause a rerender when any of the values change

```TypeScript
const {secondsElapsed, itemsComplete} = taskTrackerState.useStore();

return (
  <div>
    <div>Seconds Elapsed: {secondsElapsed}</div>
    <div>
      <h2>itemsComplete</h2>
      <ul>
        {itemsComplete.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  </div>
)
```

## Examples and Demos

- TBD

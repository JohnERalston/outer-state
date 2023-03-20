# outer-state

![Coverage lines](https://img.shields.io/badge/license-MIT-green)

![Coverage lines](https://raw.githubusercontent.com/JohnERalston/outer-state/master/media/badge-lines.svg)
![Coverage functions](https://raw.githubusercontent.com/JohnERalston/outer-state/master/media/badge-functions.svg)
![Coverage branches](https://raw.githubusercontent.com/JohnERalston/outer-state/master/media/badge-branches.svg)
![Coverage statements](https://raw.githubusercontent.com/JohnERalston/outer-state/master/media/badge-statements.svg)

---

Write simpler cleaner code faster.

---

**outer-state** is a simple yet powerful state management library for ReactJS applications.

- It is 100% boilerplate free. There is zero setup or configuration. The learning curve is tiny. It just works.

- It promotes and facilitates moving all business logic out of React and into vanilla Typescript/Javascript files.

- This massively reduces application complexity.
- It also massively reduces unit test complexity while promoting increased test quality and coverage.

- outer-state is **enjoyable** to use.

## Installation

```bash
yarn add outer-state
```

or

```bash
npm install outer-state
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
@import { createStore } from 'outer-state';

const taskTrackerState = createStore<TaskTrackerState>({
  secondsElapsed: 0,
  itemsComplete: []
});
```

### Update State

Updating state can be done inside vanilla TypeScript files. This is encouraged.

#### Functional Variant

```TypeScript
taskTrackerState.updateStore((store) => ({secondsElapsed: store.secondsElapsed + 1}));
```

#### Object Variant

```TypeScript
taskTrackerState.updateStore({secondsElapsed: 23));
```

### Read State (outside of a Component or custom-hook)

```TypeScript
const {secondsElapsed, itemsComplete} = taskTrackerState.data();
```

### Read State (inside a Component or custom-hook)

Using `useStore()` will cause a rerender when any of the values change

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

- [StackBlitz Collection](https://stackblitz.com/@JohnERalston/collections/outer-state)
- [Minimal Example](https://stackblitz.com/edit/outer-state-minimal?file=App.tsx,coolStuff.ts)
- [Complete Example](https://stackblitz.com/edit/outer-state-quiz?file=MathQuiz%2FMathQuiz.tsx)
- [NextJS Example](https://stackblitz.com/edit/outer-state-nextjs?file=src%2FAppBlogs.js)

To run the example in this repo simply navigate to `/example` and run `yarn install` followed by `yarn start`. The example will then be available at `http://localhost:1234`.

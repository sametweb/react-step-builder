# React Step Builder ![npm (tag)](https://img.shields.io/npm/v/react-step-builder/latest?label=latest) [![Total NPM Download](https://img.shields.io/npm/dt/react-step-builder.svg)](https://www.npmjs.com/package/react-step-builder)

React Step Builder is a headless, multi-step interface builder.

> Version 3 introduces some breaking changes. If you are upgrading from earlier versions, please read the documentation carefully.

> Global state management methods are removed from the library. React Step Builder will only focus on building step-by-step interfaces starting from version 3. You may use a state management tool of your choice. If this is bad news for you, I am sorry 🙇‍♂️

<br />

# Installation

Using [npm](https://www.npmjs.com/):

```
npm install react-step-builder
```

<br />

# Usage

Example:

```jsx
import { Steps, StepsProvider, useSteps } from "react-step-builder";

const App = () => {
  return (
    <StepsProvider>
      <MySteps />
    </StepsProvider>
  );
};

const MySteps = () => {
  const { next, prev } = useSteps();

  return (
    <Steps>
      <div>
        <h1>Step 1</h1>
      </div>
      <div>
        <h1>Step 2</h1>
      </div>
      <div>
        <h1>Step 3</h1>
      </div>
    </Steps>
  );
};

export default App;
```

# Documentation

### **`<Steps />`**

A component whose each direct sibling is treated as a step. **Do not add anything else inside `Steps` component** as they will be treated as a separate step.

❌ Incorrect:

```jsx
<Steps>
  <Step1 />
  <Step2 />
  <NotAStep />
</Steps>
```

✅ Correct:

```jsx
<Steps>
  <Step1 />
  <Step2>
    <NotAStep />
  </Step2>
</Steps>
```

This reason for this method is due to React's _composition over inheritance_ principle. It also allows you to manage your state easily in the parent component.

<br/>

### **`useSteps`**

A special hook that accesses the state of `<Steps />` component and exposes methods to move between steps.

`const stepsState = useSteps();`

These are the properties inside `stepsState` object.

| Property   | Type             | Description                                         |
| ---------- | ---------------- | --------------------------------------------------- |
| `total`    | `number`         | Total number of steps                               |
| `current`  | `number`         | Current step number                                 |
| `progress` | `number`         | Progress of the current step, value between 0 and 1 |
| `next`     | `function`       | Function to move to the next step                   |
| `prev`     | `function`       | Function to move to the previous step               |
| `jump`     | `function<step>` | Function to jump to the given step                  |
| `isFirst`  | `boolean`        | If the step is the first                            |
| `isLast`   | `boolean`        | If the step is the last                             |
| `hasPrev`  | `boolean`        | If the step has any previous step                   |
| `hasNext`  | `boolean`        | If the step has any next step                       |

<br/>

### `<StepsProvider />`

The component that renders `<Steps />` should be wrapped with `StepsProvider` component. `useSteps` can only be called in a component that is rendered in the DOM tree under `StepsProvider`.

Example project: https://codesandbox.io/s/react-step-builder-v3-5625v?file=/src/App.tsx

## React Step Builder

_Unopinionated step-by-step-interface builder._

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-step-builder

## Documentation

## Overview

React Step Builder allows you to combine states of multiple _step_ components in a single main state and navigate between components without losing the local states of the _steps_.

## Basic Usage

```js
<Steps totalSteps={3}>
  <Step order={1} component={Step1} />
  <Step order={2} component={Step2} />
  <Step order={3} component={Step3} />
</Steps>
```

- **Steps** is the wrapper component. You must define every `Step` under `Steps` component. It takes `totalSteps` as a prop which must match the number of `Step` components inside.

- **Step** is the component you create for each `step` in your application. It takes `order` prop for ordering the steps in the flow. `Step` that has `order={1}` prop renders default. The `component` prop takes the component that you would like to show in that step.

- If you would like to show a component in every `Step`, you must remove the `order` prop and pass `persist` as a prop to a `Step` component. It is recommended to have that persistent step either in the beginning of the steps or at the end depending on where would you like to render that component (top or bottom).

```js
<Step persist component={PersistentComponent} />
```

## Composing Step Components

There are some props available to your components that you pass to the `Step` component.

**`mainState`** _(object)_ => It gives you all the state pieces combined from your `Step` components. As your user move forward in steps, the forms they fill before all accumulate under this value. You can refer in any step component as `props.mainState`.

**`setMainState`** _(function)_ => _(Not recommended by default)_ By this function, you can manipulate your `mainState` in any of your state components. You may consider using it if the data you would like to save in your `mainState` object is not coming from a form element (technically, if the data is coming from a source without a synthetic event.) You can refer in any step component as `props.setMainState`

**`handleChange(event)`** _(function)_ => You may pass this function to any onChange event on any form element. One thing to always remember: Your form element must have name property, which eventually becomes its key in the `mainState` object. If your form element has `name="username"` then its value must be `{props.mainState.username}`.

In order to get rid of `uncontrolled/controlled component` error, simply put your value like this: `value={props.mainState.<inputName> || ''}`. Another way is, creating the `step` with `persist` keyword before ordered `step` components and define all your form value names inside that persistent step component's useEffect hook. Like this:

```js
export const PersistentStep = props => {
  useEffect(() => {
    props.setMainState({
      name: props.mainState.name || "", //For Step 1
      age: props.mainState.age || "", // For Step 2
      email: props.mainState.email || "" // For Step 3
    });
  }, []);

  return (
    ...
  );
};
```

**`steps`** _(object)_ => This object has two values: `total` and `current`. You can refer as `props.steps.total` and `props.steps.current`. If you would like to build a navigation bar, previous/next buttons, % X completed bar etc. refer to this object.

**`prevStep`** _(function)_ => This function moves to the previous step. Refer as `props.prevStep()`

**`nextStep`** _(function)_ => This function moves to the next step. Refer as `props.nextStep()`

**`jumpToStep(step)`** _(function)_ => This function moves to the specified step. Refer as `props.jumpToStep(stepNumber)`

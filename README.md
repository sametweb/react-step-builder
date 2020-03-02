# React Step Builder

_Unopinionated multi step interface builder._

## Overview

React Step Builder allows you to combine states of multiple components in a single main state and navigate between components without losing the local states of individual step components.

<br />

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-step-builder

<br />

## Usage

```js
<Steps total={3}>
  <Step order={1} component={Step1} />
  <Step order={2} component={Step2} />
  <Step order={3} component={Step3} />
</Steps>
```

<br />

### `<Steps />`

This is the wrapper component. You must define every step component under `<Steps />` component. It takes `total` as a prop which must match the number of `Step` components inside.

#### Properties

- `total` _integer_ - is the number of steps you want to create.

<br />

### `<Step />`

This is the component you create for each `step` in your application. It takes `order` prop for ordering the steps in the flow. `Step` that has `order={1}` prop renders default. The `component` prop takes the component that you would like to show in that step.

If you would like to create a persistent component that appears in every `Step`, you must remove the `order` prop and pass `persist` as a prop to a `Step` component. It is recommended to have that persistent step either in the beginning of the steps or at the end depending on where would you like to render that component (top or bottom).

```js
<Step persist component={PersistentComponent} />
```

#### Properties

- `order` _integer_ - defines the order of the `Step`. Order numbers must start with `1` and be consecutive.

<br />

## Composing Step Components

Following `props` available to your step components.

### `mainState` _(object)_

It gives you all the state pieces combined from your `Step` components. As your user move forward in steps, the forms they fill before all accumulate under this value.

### `setMainState` _(function)_

_(Not recommended to be used by default)_ By this function, you can manipulate your `mainState` in any of your state components. You may consider using it if the data you would like to save in your `mainState` object is not coming from a form element (technically, if the data is coming from a source without a synthetic event.)

### `handleChange(event)` _(function)_

You may pass this function to any onChange event on any form element. One thing to always remember: Your form element must have name property, which eventually becomes its key in the `mainState` object. If your form element has `name="username"` then its value would be `{props.mainState.username}`.

### `steps` _(object)_

- `total` - Number of total steps.
- `current` - Current step that user is on.

### `prevStep` _(function)_

This function moves to the previous step.

### `nextStep` _(function)_

This function moves to the next step.

### `jumpToStep(step)` _(function)_

This function moves to the specified step.

<br />

## UI Components

React Step Builder is principally designed to minimally interfere with UI. However, creating the most basic next and previous buttons and navigation between steps might be time consuming for those who do not expect much from the design. Here are some components that comes in the box so that you can directly use in any **`Step`** component.

<br />

### `<Button />`

It renders a button with either prev or next functionality.

Example usage:

```js
<Button next text="Next Step">
<Button prev text="Previous Step">
```

#### Properties

- `text` _String_ - is the text that will button render.
- `prev` _Boolean_ - gives the button 'Go to Previous Step' functionality. Disabled in the first step.
- `next` _Boolean_ - gives the button 'Go to Next Step' functionality. Disabled in the last step.
- _any props_ - passed to the **Button** component will be passed to the button element on the DOM.

<br />

### `<Navigation />`

It renders a button for each step with the default text of Step number. The button for current step is disabled.

Example usages:

```js
<Navigation /> // if you have 3 steps, it renders 3 buttons, each of which has the text of [1, 2, 3] consecutively
<Navigation text="*" /> // if you have 3 steps, it renders 3 buttons, each of which has the text of * (asterix)
<Navigation before="HEY " after=" HI" /> // if you have 3 steps, it renders 3 buttons, each of which has 'HEY' before and 'HI' after the step number (HEY 1 HI, HEY 2 HI, HEY 3 HI)
<Navigation active="active-class-name" visited="visited-class-name" />
```

#### Properties

- `text` _String_ - is the text that each button will show, disables `before` and `after` props.
- `before` _String_ - is the text that goes before the step number in the button.
- `after` _String_ - is the text that goes after the step number in the button.
- `active` _String_ - passes a class name to the navigation button element of the current step.
- `visited` _String_ - passes a class name to the navigation button element of the steps that comes before the current step.

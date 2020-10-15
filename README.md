# React Step Builder

[![Build Status](https://travis-ci.com/sametweb/react-step-builder.svg?branch=master)](https://travis-ci.com/sametweb/react-step-builder) [![Coverage Status](https://coveralls.io/repos/github/sametweb/react-step-builder/badge.svg?branch=master)](https://coveralls.io/github/sametweb/react-step-builder?branch=master) [![Test Coverage](https://api.codeclimate.com/v1/badges/f0c62e4a8e4826eec6c9/test_coverage)](https://codeclimate.com/github/sametweb/react-step-builder/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/f0c62e4a8e4826eec6c9/maintainability)](https://codeclimate.com/github/sametweb/react-step-builder/maintainability)
<br/><br/>

### React Step Builder is a UI-agnostic multi step interface builder.

<br/>

## Overview

React Step Builder allows you to combine states of multiple components in one place
and navigate between step components without losing the state from other step components.

It only provides wrapper components and methods to be able to render your step components
without being forced to use certain UI features in your step structure.

<br />

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save react-step-builder

<br />

## Usage

```js
<Steps>
	<Step title="My First Step" component={Step1} />
	<Step title="My Second Step" component={Step2} />
	<Step title="My Third Step" component={Step3} />
</Steps>
```

<br />

## Documentation

| Component   | Description                                                                                                                                                                                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<Steps />` | Wrapper component for Step components. Step components must be wrapped in `<Steps />` component.                                                                                                                                                               |
| `<Step />`  | This is the component you create for each `step` in your application. The `title` prop takes a title for the step, which is provided back in `props` in the step component. The `component` prop takes the component that you would like to show in that step. |

<br />

### Following `props` are available to your step components.

<hr />

### <strong>`props.current`</strong>

`number`

The current step's order number

<hr />

### <strong>`props.next`</strong>

`function()`

Moves to the next step if it exists.

<hr />

### <strong>`props.prev`</strong>

`function()`

Moves to the previous step if it exists.

<hr />

### <strong>`props.jump`</strong>

`function(<order>)`

Jumps to the step with the provided step order if it exists.

<hr />

### <strong>`props.state`</strong>

`object`

Contains all the state pieces combined from your `Step` components.
The user data that was entered accross the steps accumulate under this value.

<hr />

### <strong>`props.getState`</strong>

`function(<key>)`

Returns the state value for the provided `key`. If the key does not exist, returns empty string.

<hr />

### <strong>`props.setState`</strong>

`function(<key, value>)`

Manipulates your `state` directly. You must provide `key` and `value` to be stored in your state.<br />
_<strong>NOTE</strong>: If your data is coming from a synthetic React event (via `onChange`), use `props.handleChange` instead._

<hr />

### <strong>`props.handleChange`</strong>

`function(<event>)`

You may pass this function to `onChange` events in your form elements.
Your form element must have a `name` property, which eventually becomes its key in the `state` object.
If your form element has `name="username"`, then it is stored in state as `{props.state.username}`.

<hr />

### <strong>`props.step`</strong>

`object <StepNode>`

This object provides information about current step and methods to move between steps. Available properties and methods:

### <strong>`props.allSteps`</strong>

`function()`

This function returns an array of each step's order number and title, can be used to create a progress bar above each step.

### Properties

- `props.step.order` - Order number of the props.step.
- `props.step.title` - Title of the step (you provided when creating `<Step />` component)
- `props.step.nextStep` - Order number of the next step, `null` if it's not available
- `props.step.prevStep` - Order number of the previous step, `null` if it's not available
- `props.step.progress` - A number from 0 to 1 that represents current step's progress (current order divided by total number of steps)

### Methods

- `props.step.isFirst()` - Returns `true` if it's the first step, otherwise `false`
- `props.step.isLast()` - Returns `true` if it's the last step, otherwise `false`
- `props.step.hasNext()` - Returns `true` if there is a next step available, otherwise `false`
- `props.step.hasPrev()` - Returns `true` if there is a previous step available, otherwise `false`

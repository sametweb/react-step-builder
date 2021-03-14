# React Step Builder ![npm (tag)](https://img.shields.io/npm/v/react-step-builder/latest?label=latest)

[![Build Status](https://travis-ci.com/sametweb/react-step-builder.svg?branch=master)](https://travis-ci.com/sametweb/react-step-builder) [![Coverage Status](https://coveralls.io/repos/github/sametweb/react-step-builder/badge.svg?branch=master)](https://coveralls.io/github/sametweb/react-step-builder?branch=master) [![Test Coverage](https://api.codeclimate.com/v1/badges/f0c62e4a8e4826eec6c9/test_coverage)](https://codeclimate.com/github/sametweb/react-step-builder/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/f0c62e4a8e4826eec6c9/maintainability)](https://codeclimate.com/github/sametweb/react-step-builder/maintainability) [![Total NPM Download](https://img.shields.io/npm/dt/react-step-builder.svg)](https://www.npmjs.com/package/react-step-builder)
<br/><br/>

## A headless & type-safe multi-step UI builder.

<br/>

# Overview

React Step Builder provides;

- TypeScript support
- A global state
- Headless structure
- Out-of-box form handler methods

<br />

# Installation

Using [npm](https://www.npmjs.com/):

    $ npm install react-step-builder

<br />

# Usage

Example:

```javascript
<Steps>
	<Step title="My First Step" component={Step1} />
	<Step title="My Second Step" component={Step2} />
	<Step title="My Third Step" component={Step3} />
</Steps>
```

<br />

# Config Object

`Steps` component accepts an optional `config` object for configuring the common navigation component or components that you'd like render before or after the Step components. These components are rendered along with every step component. Here is an example:

```javascript
const Navigation = (props) => {
    return (
        <div>
            <button onClick={props.prev}>Previous</button>
            <button onClick={props.next}>Next</button>
        </div>
    );
}

const Before = (props) => {
	return <span>This component will be rendered before the Step components in every step</span>
}

const After = (props) => {
	return <span>This component will be rendered after the Step components in every step</span>
}

const config = {
	before: Before, // a React component with special props provided automatically
	after: After, // a React component with special props provided automatically
	navigation: {
		component: Navigation, // a React component with special props provided automatically
		location: "before" // or after
	}
}

<Steps config={config}>
	<Step title="My First Step" component={Step1} />
	<Step title="My Second Step" component={Step2} />
	<Step title="My Third Step" component={Step3} />
</Steps>
```

# Documentation

## Wrapper Components

`Steps` and `Step` are the only two wrapper components for creating your multi-step component.

| Component   | Description                                                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<Steps />` | Wrapper component for Step components. Accepts a `config` object for rendering a common navigation component.                                                                                                                                                                              |
| `<Step />`  | `title`: takes a title for the step, which can be accessed in `props` object of the step component. <br />`component`: takes a React component that you would like to show in that step. <br />`beforeStepChange`: takes a callback function to run right before the current step changes. |

<br />
<hr />
<br />

## Step Component `props`

The React component that is passed to each `Step` wrapper component will be injected with the following props:

| Property             | Type                          | Description                                          |
| -------------------- | ----------------------------- | ---------------------------------------------------- |
| `props.order`        | `number`                      | Order number of the current step component           |
| `props.title`        | `string`                      | Title of the current step component                  |
| `props.progress`     | `number`                      | Progress of the current step, value between 0 and 1  |
| `props.next`         | `function`                    | Function to move to the next step                    |
| `props.prev`         | `function`                    | Function to move to the previous step                |
| `props.jump`         | `function<step>`              | Function to jump to the given step                   |
| `props.isFirst`      | `function`                    | Function to check if the step is the first           |
| `props.isLast`       | `function`                    | Function to check if the step is the last            |
| `props.hasPrev`      | `function`                    | Function to check if the step has any previous step  |
| `props.hasNext`      | `function`                    | Function to check if the step has any next step      |
| `props.allSteps`     | `Array<{order, title}>`       | Array of all available steps' title and order number |
| `props.state`        | `object`                      | Combined state value of all steps                    |
| `props.setState`     | `function<key, value>`        | Function to set/update state by key                  |
| `props.getState`     | `function<key, defaultValue>` | Function to retrieve a state value by key            |
| `props.handleChange` | `function<event>`             | `onChange` event handler for form elements           |

<br />

## Navigation Component `props`

| Property             | Type                          | Description                                          |
| -------------------- | ----------------------------- | ---------------------------------------------------- |
| `props.size`         | `number`                      | Total number of steps                                |
| `props.current`      | `string`                      | Current step number                                  |
| `props.progress`     | `number`                      | Progress of the current step, value between 0 and 1  |
| `props.next`         | `function`                    | Function to move to the next step                    |
| `props.prev`         | `function`                    | Function to move to the previous step                |
| `props.jump`         | `function<step>`              | Function to jump to the given step                   |
| `props.allSteps`     | `Array<{order, title}>`       | Array of all available steps' title and order number |
| `props.state`        | `object`                      | Combined state value of all steps                    |
| `props.setState`     | `function<key, value>`        | Function to set/update state by key                  |
| `props.getState`     | `function<key, defaultValue>` | Function to retrieve a state value by key            |
| `props.handleChange` | `function<event>`             | `onChange` event handler for form elements           |

<br />

## Config Object

### `before`

It accepts a function that returns some JSX.Element. This component's `props` object is automatically populated with the `Steps` component's state (see: [NavigationComponentProps](#component-type-of-example-navigation-component)).

### `after`

It accepts a function that returns some JSX.Element. This component's `props` object is automatically populated with the `Steps` component's state (see: [NavigationComponentProps](#component-type-of-example-navigation-component)).

### `navigation`

| Property              | Type                      | Description                                                                                                                                                                       |
| --------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `component`           | `() => JSX.Element`       | This component's `props` object is automatically populated with the `Steps` component's state (see: [NavigationComponentProps](#component-type-of-example-navigation-component)). |
| `location` (optional) | "`before`" \|\| "`after`" | Location of the navigation component.                                                                                                                                             |

<br />
<hr />
<br />

## Prop types of the step components for React / TypeScript

When developing your step components, you can utilize `StepComponentProps` type for your step component props.

<br/>

Example:

```javascript
import React from "react";
import { StepComponentProps } from "react-step-builder";

const Step1 = (props: StepComponentProps) => {
	return (
		<div>
			<input
				name="fname"
				value={props.getState("fname", "")}
				onChange={props.handleChange}
			/>
			<input
				name="lname"
				value={props.getState("lname", "")}
				onChange={props.handleChange}
			/>
		</div>
	);
};

export default Step1;
```

## Example Navigation, Before, and After Components

If you'd like to add a persistent components to be shown on before or after every step, you may utilize `NavigationComponentProps` type for your custom `Navigation`, `Before`, or `After` components. Here is an example:

```javascript
const Navigation = (props: NavigationComponentProps) => {
	return (
		<div>
			<button onClick={props.prev}>Previous</button>
			<button onClick={props.next}>Next</button>
		</div>
	);
};

const Before = (props: NavigationComponentProps) => {
	return (
		<span>This component will be rendered before the Step components</span>
	);
};

const After = (props: NavigationComponentProps) => {
	return <span>This component will be rendered after the Step components</span>;
};
```

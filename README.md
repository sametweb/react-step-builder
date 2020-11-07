# React Step Builder

[![Build Status](https://travis-ci.com/sametweb/react-step-builder.svg?branch=master)](https://travis-ci.com/sametweb/react-step-builder) [![Coverage Status](https://coveralls.io/repos/github/sametweb/react-step-builder/badge.svg?branch=master)](https://coveralls.io/github/sametweb/react-step-builder?branch=master) [![Test Coverage](https://api.codeclimate.com/v1/badges/f0c62e4a8e4826eec6c9/test_coverage)](https://codeclimate.com/github/sametweb/react-step-builder/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/f0c62e4a8e4826eec6c9/maintainability)](https://codeclimate.com/github/sametweb/react-step-builder/maintainability) [![Total NPM Download](https://img.shields.io/npm/dt/react-step-builder.svg)](https://www.npmjs.com/package/react-step-builder)
<br/><br/>

## React Step Builder is a UI-agnostic multi step interface builder.

<br/>

# Overview

React Step Builder provides;

- React / TypeScript support and type definitions
- A combined global state collected from- and persistent across each individual step component
- UI-agnostic functionality for navigating between step components
- Ready-to-use form handling methods for handling React form elements
- Easy to use API

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

# Documentation

## Wrapper Components

`Steps` and `Step` are the only two wrapper components for creating your multi-step component.

| Component   | Description                                                                                                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<Steps />` | Wrapper component for Step components.                                                                                                                                                                                                                                                     |
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
<hr />
<br />

## Prop types of the step components for React / TypeScript

When developing your step components, you can utilize `StepComponentProps` type definition for your step component props.

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

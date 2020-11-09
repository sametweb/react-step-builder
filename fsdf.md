[In my first and latest post](https://dev.to/sametweb/how-to-create-multi-step-forms-in-react-3km4), I introduced my `react-step-builder` package for creating multi-step front-end interfaces with an example registration form.

Recently, I was working on adding TypeScript support to my project. Along with the TypeScript support, I also made some changes to the API of the library. I would like to mention those changes in this post for those who are familiar with the previous version and would like to upgrade to the TypeScript version.

## What changed?

| v1.1.5                | v.2.0.x                             | Reason                                                                                                                                                    |
| --------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `props.current`       | N/A                                 | no real use case                                                                                                                                          |
| `props.getState(key)` | `props.getState(key, defaultValue)` | Before initiating a state value, getState returns the default value you set. For inputs, pass an empty string. For checkbox values, pass a boolean value. |

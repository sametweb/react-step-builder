import { useState } from "react";

const useMainState = INITIAL_VALUE => {
  const [state, setState] = useState(INITIAL_VALUE);

  const setMainState = newState => setState({ ...state, ...newState });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return [state, setMainState, handleChange];
};

export default useMainState;

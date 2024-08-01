import { ChangeEvent, useState } from 'react';

// This hook can be used to handle with the application states, like inputs, checkbox and etc
// for using this hook you need to pass a object as initial state, and the input name must be
// the same of the object key, example: 
// const INITIAL_STATE = {
//    anythingYouWant: '',
// }

// const [genericState, setGenericState] = useGenericState({INITIAL_STATE});

// <input name={anythingYouWant} value={genericState.anythingYouWant} onChange={setGenericState} />

type SetStateFunction<T> = (event: ChangeEvent<HTMLInputElement>) => void;

export default function useGenericState<T extends Record<string, string | boolean>>(initial_state: T): [ T, SetStateFunction<T> ] {
  const [ genericState, setGenericState ] = useState(initial_state);

  const setState: SetStateFunction<T> = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    return setGenericState((prevState) => ({ ...prevState, [ name ]: value }));
  };

  return [ genericState, setState ];
}


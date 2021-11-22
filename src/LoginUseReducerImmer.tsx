import React, { FormEventHandler } from 'react';
import produce, { Draft, Immutable } from 'immer';

import { login } from './utils'

type State = Immutable<{
  username: string; password: string
  isLoading: boolean; error: string; isLoggedIn: boolean
}>

type ACTIONTYPE =
  | { type: 'field'; fieldName: 'username'; payload: string }
  | { type: 'field'; fieldName: 'password'; payload: string }
  | { type: 'login' }
  | { type: 'success' }
  | { type: 'error' }
  | { type: 'logOut' }

function loginReducer(state: Draft<typeof initialState>, action: ACTIONTYPE) {
  switch (action.type) {
    case 'field': {
      state[action.fieldName] = action.payload
      return
    }
    case 'login': {
      state.error = ''
      state.isLoading = true
      return
    }
    case 'success': {
      state.isLoggedIn = true
      state.isLoading = false
      return
    }
    case 'error': {
      state.error = 'Incorrect username or password!'
      state.isLoggedIn = false
      state.isLoading = false
      state.username = ''
      state.password = ''
      return
    }
    case 'logOut': {
      state.isLoggedIn = false
      return
    }
    default:
      throw new Error();
  }
}

const initialState: State = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};

const curriedLoginReducer = produce(loginReducer)

/* const curriedLoginReducer = (state: typeof initialState, ...args: []) => {
*     return produce(state, draft => loginReducer(draft, ...args))
* } */

export default function LoginUseReducer() {
  const [state, dispatch] = React.useReducer(curriedLoginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    dispatch({ type: 'login' });
    // dispatch act like partial function of reducer for action
    try {
      await login({ username, password })
      dispatch({ type: 'success' })
    } catch (error) {
      dispatch({ type: 'error' })
    }
  }

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: 'logOut' })}>
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'username',
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={e =>
                dispatch({
                  type: 'field',
                  fieldName: 'password',
                  payload: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

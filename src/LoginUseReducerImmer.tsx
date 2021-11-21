import React, { FormEventHandler } from 'react';
import produce from 'immer';

import { login } from './utils'

type ACTIONTYPE =
  | { type: "field"; fieldName: "username"; payload: string }
  | { type: "field"; fieldName: "password"; payload: string }
  | { type: 'login' }
  | { type: 'success' }
  | { type: 'error' }
  | { type: 'logOut' }

function loginReducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'field': {
      return produce(state, draft => {
        draft[action.fieldName] = action.payload
      });
    }
    case 'login': {
      return produce(state, draft => {
        draft.error = ''
        draft.isLoading = true
      });
    }
    case 'success': {
      return produce(state, draft => {
        draft.isLoggedIn = true
        draft.isLoading = false
      });
    }
    case 'error': {
      return produce(state, draft => {
        draft.error = 'Incorrect username or password!'
        draft.isLoggedIn = false
        draft.isLoading = false
        draft.username = ''
        draft.password = ''
      });
    }
    case 'logOut': {
      return produce(state, draft => {
        draft.isLoggedIn = false
      });
    }
    default:
      return state;
  }
}

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};

export default function LoginUseReducer() {
  const [state, dispatch] = React.useReducer(loginReducer, initialState);
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

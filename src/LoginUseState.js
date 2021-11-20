import React, { useState } from 'react';

import { login } from './utils';

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  error: '',
  isLoggedIn: false,
};

export default function LoginUseState() {
  const [username, setUsername] = useState(initialState.username);
  const [password, setPassword] = useState(initialState.password);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [error, setError] = useState(initialState.error);
  const [isLoggedIn, setIsLoggedIn] = useState(initialState.isLoggedIn);

  const onSubmit = async e => {
    e.preventDefault();

    setError('')
    setIsLoading(true)

    try {
      await login({username, password})
      setIsLoggedIn(true)
      setIsLoading(false)
    } catch (error) {
      setError('Incorrect username or password!')
      setIsLoggedIn(false)
      setIsLoading(false)
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={e => setUsername(e.currentTarget.value)
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)
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

import React, { FormEventHandler } from 'react';

import { login } from './utils';

export default function LoginUseState() {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();

    setError('')
    setIsLoading(true)

    try {
      await login({ username, password })
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

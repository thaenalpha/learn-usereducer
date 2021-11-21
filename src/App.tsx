import './App.css';

import React from 'react';

import LoginUseReducer from './LoginUseReducer';
import LoginUseState from './LoginUseState';

function App() {
  const [, forceUpdate] = React.useState<object>();
  const { hash } = window.location;
  React.useEffect(() => {
    window.addEventListener('hashchange', () => forceUpdate({}));
  }, []);
  return (
    <>
      {!hash && (
        <div className="App App-Column">
          <a href="#useState">useState</a>
          <br />
          <br />
          <a href="#useReducer">useReducer</a>
        </div>
      )}
      {hash === '#useState' && <LoginUseState />}
      {hash === '#useReducer' && <LoginUseReducer />}
    </>
  );
}

export default App;

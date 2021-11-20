import './App.css';

import React, { useState, useEffect } from 'react';

function App() {
  const [, forceUpdate] = useState();
  const { hash } = window.location;
  useEffect(() => {
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

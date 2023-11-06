import { useRef } from 'react';
import Router from './Router';
import './assets/scss/base/common.scss';

const App = () => {
  const targetRef = useRef(null);
  const themeSwitcher = e => {
    e.target.checked
      ? targetRef.current.setAttribute('data-theme', 'dark')
      : targetRef.current.setAttribute('data-theme', 'light');
  };

  return (
    <>
      <div ref={targetRef} data-theme="light">
        <Router />
        <div className="theme-switcher">
          <input id="theme-switcher" type="checkbox" onClick={themeSwitcher} />
          <label htmlFor="theme-switcher">
            <span>테마 스위치</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default App;

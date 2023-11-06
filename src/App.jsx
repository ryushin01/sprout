import { useRef } from 'react';
import Header from './components/Header/Header';
import Router from './Router';
import Gnb from './components/Gnb/Gnb';
import './assets/scss/base/common.scss';

const App = () => {
  const targetRef = useRef(null);
  const themeSwitcher = e => {
    e.target.checked
      ? targetRef.current.setAttribute('data-theme', 'dark')
      : targetRef.current.setAttribute('data-theme', 'light');
  };

  const isLogin = true;

  return (
    <>
      <div ref={targetRef} data-theme="light">
        {isLogin && <Header />}
        {isLogin && <Gnb />}
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

import React from 'react'
import SignInForm from '../login/components/SignInForm/component';
import classNames from 'classnames'
import s from './style.scss'


function App() {
  return (
    <div className={classNames(s.backgroundHolder, s.main)}>
        <SignInForm onAuth={(user) => {
          console.log(user);
          console.log('authed');
        }}/>
    </div>
  );
}

export default App;

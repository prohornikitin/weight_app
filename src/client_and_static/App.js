import React from 'react'
import SignInForm from './login/components/SignInForm';
import classNames from 'classnames'
import styles from './app.scss'


function App() {
  return (
    <div className={classNames(styles.backgroundHolder, styles.main)}>
        <SignInForm onAuth={(user) => {
          console.log(user);
          console.log('authed');
        }}/>
    </div>
  );
}

export default App;

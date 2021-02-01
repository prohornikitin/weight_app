import React from 'react'
import SignInForm from './login/components/SignInForm';
import classNames from 'classnames'
import styles from './app.scss'


function App() {
  return (
    <div className={classNames(styles.backgroundHolder, styles.main)}>
        <SignInForm onAuth={() => console.log('da')}/>
    </div>
  );
}

export default App;

import React, { useState } from 'react'
// import SignInForm from '../auth/Form/component';
import SignInForm from '../auth/Form';
import classNames from 'classnames'
import s from './style.scss'
import Graph from '../Graph/component'


function App() {
  const [isAuthed, setAuthed] = useState(false);


  return (
    <div className={classNames(s.backgroundHolder, s.main)}>
        <SignInForm onAuth={() => setAuthed(true)} shown={!isAuthed}/>
        
    </div>
  );
}

export default App;

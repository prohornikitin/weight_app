/**
 * @module
 */
import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import AuthForm from '../AuthForm/AuthForm';
import classNames from 'classnames'
import s from './style.scss'
import Main from '../Main/Main';
import NullUser from '../NullUser'
import axios from 'axios'


/**
 * Root react component. 
 * It stores user(or null if not uthentificated),
 * handles authentification,
 * update user on server if object midify there.
 * @component
 */
function App() {
  const [isAuthed, setAuthed] = useState(false);
  const [user, setUser] = useState(new NullUser());

  const handleAuth = (user)=>{
    setAuthed(true);
    setUser(user);
  }

  const setUserForChilds = (user) => {
    setUser(user);
    axios.put( "/update_user", {user: user} )
      .catch(err => console.log(err));
  }

  return (
    <div className={classNames(s.backgroundHolder, s.fullscreen, s.content)}>
        <div className={classNames(s.authForm, (!isAuthed ? s.fadeIn : s.fadeOutWithDelay))}>
          <AuthForm onAuth={handleAuth}/>
        </div>
        <div className={isAuthed ? s.fadeInWithDelay : s.fadeOut}>
          <Main userState={[user, setUserForChilds]}/>
        </div>
    </div>
  );
}

export default App;

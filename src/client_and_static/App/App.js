import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import AuthForm from '../Auth/Form';
import classNames from 'classnames'
import s from './style.scss'
import Main from '../Main/Main';
import NullUser from '../NullUser'
import axios from 'axios'

export default function App() {
  const [isAuthed, setAuthed] = useState(false);
  const [user, setUser] = useState(NullUser);

  const handleAuth = (user)=>{
    setAuthed(true);
    setUser(user);
  }


  return (
    <div className={classNames(s.backgroundHolder, s.fullscreen, s.content)}>
        <div className={s.authForm}>
          <AuthForm onAuth={handleAuth} shown={!isAuthed}/>
        </div>
        <Main shown={isAuthed} user={user} setUser={(user => {
          setUser(user);
          axios.put( "/update_user", {user: user} )
            .catch(err => console.log(err));
        })}/>
    </div>
  );
}

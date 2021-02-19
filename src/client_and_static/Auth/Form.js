import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'bootstrap'
import PropTypes from 'prop-types';
import {Button, Form, FormGroup} from 'reactstrap';
import axios from 'axios'
import classNames from 'classnames'
import s from  './style.scss'
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';


export default function AuthForm(props) {
    const [email, setEmail] = useState('');
    const [isEmailValid, setEmailValidity] = useState(false);

    const [password, setPassword] = useState('');
    const [isPasswordValid, setPasswordValidity] = useState(false);

    const [formAlert, setFormAlert] = useState('');


    const isValid = ()=>{
        return isEmailValid && isPasswordValid;
    }

    const trySignIn = ()=>{
        setFormAlert({
            message: '',
            type: 'none',
        });
        if(isValid()) {
            axios.post('/signin', {
                email: email,
                password: password,
            })
            .then(response => {
                if(response.data.status === 'success') {
                    setFormAlert({
                        message: 'Successfully logged in',
                        type: 'success',
                    });
                    const user = response.data.user;
                    user.password = password;
                    props.onAuth(user);
                } else {
                    throw response.data.error
                }
            })
            .catch(error => {
                setFormAlert({
                    message: error,
                    type: 'error',
                });
            });
        }
    }

    const trySignUp = ()=>{
        setFormAlert({
            message: '',
            type: 'none',
        });
        if(isValid()) {
            axios.post('/signup', {
                email: email,
                password: password,
            })
            .then(response => {
                if(response.data.status === 'success') {
                    setFormAlert({
                        message: 'Successfully registered',
                        type: 'success',
                    });
                } else {
                    throw response.data.error
                }
            })
            .catch(error => {
                setFormAlert({
                    message: error,
                    type: 'error',
                });
            });
        }
    }

    
    return (
        <Form className={classNames("container", (props.shown ? s.fadeIn : s.fadeOut))} id="signInForm">
                <div className="row">
                    <div className="col">
                        <div className={(formAlert.type == 'error') ? "alert alert-warning collapse.show" : "collapse"} role="alert">
                            {formAlert.message}
                        </div>
                        <div className={(formAlert.type == 'success') ? "alert alert-success collapse.show" : "collapse"} role="alert">
                            {formAlert.message}
                        </div>
                    </div>
                </div>
                <FormGroup className="row">
                    <div className="col">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <EmailInput onValidityChange={state => setEmailValidity(state)} onChange={event => setEmail(event.target.value)} name="email" className="form-control"/>
                    </div>
                </FormGroup>
                <FormGroup className="row">
                    <div className="col">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <PasswordInput onValidityChange={state => setPasswordValidity(state)} onChange={event => setPassword(event.target.value)} name="password" className="form-control"/>
                    </div>
                </FormGroup>
                <FormGroup className="row">
                    <div className="col">
                        <Button color="primary" className="btn-sm btn-block" onClick={() => trySignIn()}>Sign in</Button>
                    </div>
                    <div className="col">
                        <Button color="primary" className="btn-sm btn-block" onClick={() => trySignUp()}>Sign up</Button>
                    </div>
                </FormGroup>
            </Form>
    );
}

AuthForm.propTypes = {
    shown: PropTypes.bool,
}

AuthForm.defaultProps = {
    shown: true,
}



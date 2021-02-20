/**
 * @module
 */
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import {Button, Col, Form, FormGroup, Row} from 'reactstrap';
import axios from 'axios'
import PasswordInput from '../FormFields/PasswordInput';
import EmailInput from '../FormFields/EmailInput';


/**
 * Called after successfull authentification.
 * @callback onAuthCallback
 * @param {Object} user - all user info.
 */

/**
 * Form used to authentificate the user or create a new user.
 * @component
 * @param {Object} props - react component props.
 * @param {onAuthCallback} props.onAuth - callback which is called after successfull authentification.
 */
function AuthForm(props) {
    const [email, setEmail] = useState('');
    const [isEmailValid, setEmailValidity] = useState(false);

    const [password, setPassword] = useState('');
    const [isPasswordValid, setPasswordValidity] = useState(false);

    const isValid = ()=>{
      return isEmailValid && isPasswordValid;
    }

    const [formAlert, setFormAlert] = useState('');

    const [submitAction, setSubmitAction] = useState('signIn')

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
        <Form className="container" id="signInForm" onSubmit={
          (event) => {
            event.preventDefault();
            if(submitAction == 'signUp') {
              trySignUp();
            } else {
              trySignIn();
            }
          }
        }>
          <Row>
            <Col>
              <div className={(formAlert.type === 'error') ? "alert alert-warning collapse.show" : "collapse"} role="alert">
                {formAlert.message}
              </div>
              <div className={(formAlert.type === 'success') ? "alert alert-success collapse.show" : "collapse"} role="alert">
                {formAlert.message}
              </div>
            </Col>
          </Row>
          <FormGroup>
            <Row>
              <Col>
                <label htmlFor="email" className="sr-only">Email address</label>
                  <EmailInput name="email"
                              onValidityChange={state => setEmailValidity(state)} 
                              onChange={event => setEmail(event.target.value)} />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <label htmlFor="password" className="sr-only">Password</label>
                <PasswordInput name="password"
                                onValidityChange={state => setPasswordValidity(state)} 
                                onChange={event => setPassword(event.target.value)} />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <Button type="submit" color="primary" className="btn-sm btn-block"
                        onClick={() => setSubmitAction('signIn')}>Sign in</Button>
              </Col>
              <Col>
                <Button type="submit" color="primary" className="btn-sm btn-block" 
                        onClick={() => setSubmitAction('signUp')}>Sign up</Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
    );
}


AuthForm.propTypes = {
    onAuth: PropTypes.func.isRequired,
}

export default AuthForm;
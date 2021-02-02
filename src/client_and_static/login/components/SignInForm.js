import React from 'react'
import 'bootstrap'
import axios from 'axios'
import $ from 'jquery'
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import PropTypes from 'prop-types';


class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.onAuth = props.onAuth;
        this.trySignIn = this.trySignIn.bind(this);
        this.trySignUp = this.trySignUp.bind(this);
        this.state = {
            errorMessage: '',
            successMessage: '',
        };
        this.passwordRef = React.createRef();
        this.emailRef = React.createRef()
    }

    trySignIn() {
        this.setState({errorMessage: '', successMessage: ''})
        if(this.passwordRef.current.isValid() && this.emailRef.current.isValid()) {
            axios.post('/signin', {
                email: this.emailRef.current.getValue(),
                password: this.passwordRef.current.getValue(),
            })
            .then((response) => {
                if(response.data.status === 'success') {
                    this.setState({successMessage: 'Successfully logged in'})
                    $("#signInForm")
                        .delay(500)
                        .fadeOut(500)
                        this.onAuth(response.data.user);
                } else {
                    throw response.data.error
                }
            })
            .catch((error) => {
                this.setState({errorMessage: error})
            });
        }
    }

    trySignUp() {
        this.setState({errorMessage: '', successMessage: ''})
        if(this.passwordRef.current.isValid() && this.emailRef.current.isValid()) {
            axios.post('/signup', {
                email: this.emailRef.current.getValue(),
                password: this.passwordRef.current.getValue(),
            })
            .then((response) => {
                this.setState({errorMessage: '', successMessage: ''})
                if(response.data.status === 'success') {
                    this.setState({successMessage: 'Successfully registered'})
                } else {
                    throw response.data.error
                }
            })
            .catch((error) => {
                this.setState({errorMessage: error})
            });
        }
    }

 
    render() {
        return (
            <form className="container" id="signInForm" style={{
                width: "40vw",
	            height: "20vw",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: "auto"
             }}>
                <div className="row">
                    <div className="col">
                        <div className={(this.state.errorMessage != '') ? "alert alert-warning collapse.show" : "collapse"} role="alert">
                            {this.state.errorMessage}
                        </div>
                        <div className={(this.state.successMessage != '') ? "alert alert-success collapse.show" : "collapse"} role="alert">
                            {this.state.successMessage}
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <EmailInput name="email" className="form-control" ref={this.emailRef}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <PasswordInput name="password" className="form-control" ref={this.passwordRef}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col">
                        <button className="col btn btn-sm btn-primary btn-block" onClick={this.trySignIn} type="button">Sign in</button>
                    </div>
                    <div className="col">
                        <button className="col btn btn-sm btn-primary btn-block" onClick={this.trySignUp} type="button">Sign up</button>
                    </div>
                </div>
            </form>
            
        )
    }
}

SignInForm.propTypes = {
    onAuth: PropTypes.func,
};

export default SignInForm

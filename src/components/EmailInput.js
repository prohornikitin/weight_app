// var Router = window.ReactRouter.Router;
// var Route = window.ReactRouter.Route;
// var hashHistory = window.ReactRouter.hashHistory;
// var Link = window.ReactRouter.Link;
import React from 'react'
import 'bootstrap'
import $ from 'jquery'
import PropTypes from 'prop-types';


class EmailInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            value: '',
            errors: '',
        };
    }

    handleInputChange(event) {
        const password = event.target.value
        this.setState({
            value: password,
            errors: this.#getFormattedErrors(password),
        }, () => {
            const id = '#' + this.props.id;
            if(this.state.errors != '') {
                $(id).popover('show');
            } else {
                $(id).popover('hide');
            }
        });
    }

    isValid() {
        return this.state.errors == '';
    }

    #getFormattedErrors(password) {
        const errors = this.#getErrors(password);
        let formatted = '';
        for(const error of errors) {
            formatted += '<p>' + error + '</p>';
        }
        return formatted;
    }

    #getErrors(email) {
        let errors = [];
        // if(!email.match('/.+@.+\..+/i')) {
        //     errors.push('password must contain at least 8 characters');
        // }
        if(email === '') {
            errors.push('must not be empty')
        } else {
            if (!email.match('^.*(?=.*@).*$')) {
                errors.push("must contain '@'");
            }
        }
        return errors;
    }

    getValue() {
        return this.state.value;
    }
    
    render() {
        return (
                <input type="email" onChange={this.handleInputChange} placeholder="Email address" required
                        id={this.props.id} name={this.props.name} className={this.props.className}
                        data-toggle="popover" data-placement="left" data-html="true" data-content={this.state.errors} data-trigger="manual"/>
        );
    }
}

EmailInput.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
};

EmailInput.defaultProps = {
    name: 'email',
    id: 'email',
    className: ''
}

export default EmailInput

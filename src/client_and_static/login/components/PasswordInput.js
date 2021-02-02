import React from 'react'
import 'bootstrap'
import $ from 'jquery'
import PropTypes from 'prop-types';


class PasswordInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            value: '',
            errors: this.#getFormattedErrors(''),
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

    #getErrors(password) {
        let errors = [];
        if(password === '') {
            errors.push('must not be empty')
        } else {
            if(!password.match('^.*(?=.{8,}).*$')) {
                errors.push('must contain at least 8 characters');
            }
            if (!password.match('^.*(?=.*[A-Z]).*$')) {
                errors.push('must contain uppercase letters');
            }
            if (!password.match('^.*(?=.*[a-z]).*$')) {
                errors.push('must contain lowercase letters');
            }
            if (!password.match('^.*(?=.*[0-9]).*$')) {
                errors.push('must contain digits');
            }
        }
        return errors;
    }

    getValue() {
        return this.state.value;
    }
    
    render() {
        return (
                <input type="password" onChange={this.handleInputChange} placeholder="Password" required
                        id={this.props.id} name={this.props.name} className={this.props.className}
                        data-toggle="popover" data-placement="left" data-html="true" data-content={this.state.errors} data-trigger="manual"/>
        );
    }
}

PasswordInput.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
};

PasswordInput.defaultProps = {
    name: 'password',
    id: 'password',
    className: ''
}

export default PasswordInput

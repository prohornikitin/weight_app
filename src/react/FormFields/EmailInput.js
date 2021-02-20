/**
 * @module
 */
import React from 'react'
import $ from 'jquery'
import 'bootstrap'
import PropTypes from 'prop-types';


/**
 * Email input with validation(errors displayed in popovers).
 * @component
 */
class EmailInput extends React.Component {
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
            this.props.onValidityChange(this.state.errors === '');
        });
        this.props.onChange(event);
    }

    isValid() {
        return this.state.errors == '';
    }

    #getFormattedErrors(email) {
        const errors = this.#getErrors(email);
        let formatted = '';
        for(const error of errors) {
            formatted += '<p>' + error + '</p>';
        }
        return formatted;
    }

    #getErrors(email) {
        let errors = [];
        if(email === '') {
            errors.push('must not be empty')
        } else {
            if (!email.match('^.*(?=.*@).*$')) {
                errors.push("must contain '@'");
            }
        }
        return errors;
    }
    
    render() {
        return (
                <input type="email" onChange={this.handleInputChange} placeholder={"Email address"} required
                        id={this.props.id} name={this.props.name} className="form-control"
                        data-toggle="popover" data-placement="left" data-html="true" data-content={this.state.errors} data-trigger="manual"/>
        );
    }
}

EmailInput.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

EmailInput.defaultProps = {
    name: 'email',
    id: 'email',
}

export default EmailInput;

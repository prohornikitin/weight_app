/**
 * @module
 */
import React, { useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types';
import {Button, Form, FormGroup, Input} from 'reactstrap';


/**
 * Called after successfull authentification.
 * @callback onSubmitCallback
 * @param {Number} weight
 */

/**
 * Form used to get today weight from user input and record it.
 * @component
 * @param {Object} props
 * @param {onSubmitCallback} props.onSubmit - callback which is called after successfull authentification.
 */
function TodayWeightForm(props) {
  const [weight, setWeight] = useState(0);

  const onSubmit = (event)=>{
    event.preventDefault();
    props.onSubmit(weight);
  }

  return (
    <Form className="container" onSubmit={onSubmit}>
      <div className="alert alert-primary row" role="alert">
        Hey, you didn't weigh yourself today! Enter your current weight.
      </div>
      <FormGroup className="row">
        <div className="col">
          <Input type="number" step="0.1" min="0" name="today_weight" placeholder="Your weight" 
                 onChange={event => setWeight(event.target.value)} 
                 style={{width: "100%"}}/>
        </div>
      </FormGroup>
      <FormGroup className="row">
        <Button type="submit" color="primary" className="btn-sm btn-block">Save current weight</Button>
      </FormGroup>
    </Form>
  );
}

TodayWeightForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default TodayWeightForm;

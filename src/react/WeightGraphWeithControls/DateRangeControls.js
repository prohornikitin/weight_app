/**
 * @module
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './style.scss'
import classNames from 'classnames'
import {Col, Form, FormGroup, Input} from 'reactstrap'

/**
 * Stores a preset types for date periods.
 */
export const presetTypes = Object.freeze({
  year: 'Year',
  halfAYear: 'Half a year',
  month: 'Month',
  two_weeks: 'Two weeks',
  week: 'Week',
  custom: 'Custom',
});


/**
 * Called if user change value of one of the fields.
 * @callback onChangeCallback
 * @param {object} preset - preset.
 * @param {string} preset.type - type of preset @see {@link presetTypes}
 * @param {Date=} preset.start - date range start (only available if {@link preset.type} is 'Custom').
 * @param {Date=} preset.end - date range end (only available if {@link preset.type} is 'Custom').
 */


/**
 * Component for selecting a time period
 * @component
 * @param {Object} props
 * @param {onChangeCallback} props.onChange
 */

function DateRangeControls(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [presetType, setPresetType] = useState('year');
  const getPreset = (type, startDate, endDate)=>{
    if(type !== presetTypes.custom) {
      return {
        type: type,
      };
    } else {
      return {
        type: type,
        start: startDate,
        end: endDate,
      };
    }
  }

  const generateOptions = ()=>{
    const options = [];
    Object.values(presetTypes).forEach((presetName)=>{
      options.push(<option key={presetName}>{presetName}</option>);
    });
    return options;
  }

  return (
      <Form className="container">
        <FormGroup className="row">
          <Col>
            <Input type="select" name="select" id="exampleSelect" defaultValue=""
                   onChange={event => {
                      setPresetType(event.target.value);
                      props.onChange(getPreset(event.target.value, startDate, endDate));
                   }}>
              <option disabled value="">Select a date range</option>
              {generateOptions()}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup className={classNames("row", presetType===presetTypes.custom ? s.shown : s.hidden)}>
          <Col>
            <Input type="date" id="start" name="start" placeholder="Start"
                  onChange={event => {
                    const value = new Date(event.target.value);
                    setStartDate(value);
                    props.onChange(getPreset(presetType, value, endDate));
                  }}/>
          </Col>
          <Col>
            <Input type="date" id="end" name="end" placeholder="End"
                  onChange={event => {
                    const value = new Date(event.target.value);
                    setEndDate(value);
                    props.onChange(getPreset(presetType, startDate, value));
                  }}/>
          </Col>
        </FormGroup>
      </Form>
  );
}

DateRangeControls.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default DateRangeControls;

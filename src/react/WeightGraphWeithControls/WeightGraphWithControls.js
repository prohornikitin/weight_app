/**
 * @module
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WeightGraph from './WeightGraph'
import DateRangeControls, {presetTypes} from './DateRangeControls';


/**
 * Uses {@link DateRangeControls} to get date range
 * and filter {@link props.data} to display only part that is in range.
 * @component
 * @param {Object} props 
 * @param {Array} props.data - array consist of objects to plot a graph.
 * @param {Number} props.data[].date - number representing date of measurement
 * @param {Number} props.data[].weight - number representing weight of the user on corresponding date.
 */
function WeightGraphWithControls(props) {
  const [filteredData, setFilteredData] = useState(props.data);

  const getDateLimitsFrom = (preset)=>{
    if(presetTypes.custom === preset.type) {
      preset.start.setHours(0,0,0,0);
      preset.end.setHours(23,59,59,999);//last millisecond of the day
      return [preset.start, preset.end];
    } else {
      let end = new Date();
      end.setHours(23,59,59,999);//last millisecond of the day
      let start = new Date();
      start.setHours(0,0,0,0);
      if (presetTypes.year === preset.type) {
        start.setFullYear(end.getFullYear()-1);
      } else if (presetTypes.halfAYear === preset.type) {
        start.setFullYear(end.getFullYear()-0.5);
      } else if (presetTypes.month === preset.type) {
        start.setMonth(end.getMonth()-1);
      } else if (presetTypes.two_weeks === preset.type) {
        start.setDate(end.getDate()-2*7);
      } else if (presetTypes.week === preset.type) {
        start.setDate(end.getDate()-7);
      } else {
        start.setTime(0);
        end.setTime(0);
      }
      return [start, end];
    }
  }

  const onDateRangeChange = (preset)=>{
    const [start, end] = getDateLimitsFrom(preset);
    const slice = props.data.filter(item=> {  
      return (start.getTime() < item.date) && (item.date < end.getTime());
    });
    setFilteredData(slice);
  }

  return (
    <>
      <WeightGraph data={filteredData}/>
      <div style={{
        marginTop: "20px",
      }}>
        <DateRangeControls onChange={onDateRangeChange}/>
        </div>
    </>
  );
}

WeightGraphWithControls.propTypes = {
  data: PropTypes.array.isRequired,
}

export default WeightGraphWithControls;

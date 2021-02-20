/**
 * @module
 */
import React, { useEffect, useMemo } from 'react'
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import PropTypes from 'prop-types';


/**
 * Uses AgChartsReact Component to build a graph from the {@link data}.
 * Only contain display settings.
 * @component
 * @param {Object} props 
 * @param {Array} props.data - array consist of objects to plot a graph.
 * @param {Number} props.data[].date - number representing date of measurement.
 * @param {Number} props.data[].weight - number representing weight of the user on corresponding date.
 */
function WeightGraph(props) {

  const options = {
    series: [
      {
        type: 'line',
        xKey: 'date',
        yKey: 'weight',
        tooltipEnabled: false,
        tooltip: {
          renderer: (params)=>{
              console.log(params.yValue);
              return {
                  title: new Date(params.xValue).toDateString(),
                  content: (params.yValue + 'kg'),
              };
          }
        }
      },
    ],
    axes: [
      {
        type: 'time',
        nice: true,
        position: 'bottom',
        tick: { count: agCharts.time.month },
        label: { format: '%d %b' },
      },
      {
        type: 'number',
        position: 'left',
        label: {
          formatter: function (params) {
            return params.value + 'kg';
          },
        },
      },
    ],
    padding: {
      top: 20,
      right: 40,
      bottom: 20,
      left: 20,
    },
    legend: { enabled: false },
    data: props.data,
  };
  

  return (
    <AgChartsReact options={options}/>
  )
}

WeightGraph.propTypes = {
  data: PropTypes.array.isRequired,
}

export default WeightGraph;

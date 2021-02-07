import React, { useEffect, useMemo } from 'react'
// import { Chart } from 'react-charts'
import classNames from 'classnames'
import s from './style.scss'
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';


function Graph(props) {
  const options = {
      series: [
        {
          type: 'line',
          xKey: 'date',
          yKey: 'weight',
          tooltipEnabled: false,
        },
      ],
      axes: [
        {
          type: 'time',
          nice: true,
          position: 'bottom',
          tick: { count: agCharts.time.month },
          label: { format: '%d %b %Y' },
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
      data: [
        {
          date: new Date('01 Jan 2019'),
          weight: 4.2,
        },
        {
          date: new Date('01 Feb 2019'),
          weight: 6.9,
        },
        {
          date: new Date('01 Mar 2019'),
          weight: 7.9,
        },
        {
          date: new Date('01 Apr 2019'),
          weight: 9.1,
        },
        {
          date: new Date('01 May 2019'),
          weight: 11.2,
        },
        {
          date: new Date('01 May 2019'),
          weight: 11.2,
        },
        {
          date: new Date('01 May 2019'),
          weight: 11.2,
        },
        {
          date: new Date('01 May 2019'),
          weight: 11.2,
        },
      ],
    };

  return (
    <div className={classNames(s.base, (props.shown ? s.fadeIn : s.hidden))}>
      <AgChartsReact options={options} tooltip/>
    </div>
  )
}

export default Graph;

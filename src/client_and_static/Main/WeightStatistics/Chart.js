import React, { useEffect, useMemo } from 'react'
import s from '../style.scss'
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';


export default function Chart(props) {
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
      // padding: {
      //   top: 20,
      //   right: 40,
      //   bottom: 20,
      //   left: 20,
      // },
      legend: { enabled: false },
      data: props.data,
    };

  return (
    <div className={s.chart}>
      <AgChartsReact options={options} tooltip/>
    </div>
  )
}

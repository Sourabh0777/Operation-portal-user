/* eslint-disable react/prop-types */
import React from 'react';
import { CChartLine } from '@coreui/react-chartjs';

const LineChart = ({ charts }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {charts.map((chart, index) => (
        <CChartLine
          key={index}
          data={{
            labels: chart.labels,
            datasets: chart.datasets,
          }}
          labels={chart.labelType || 'months'} 
          style={{ height: '300px', width: '300px' }} 
        />
      ))}
    </div>
  );
};

export default LineChart;

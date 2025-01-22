/* eslint-disable react/prop-types */
import React from 'react';
import { CChartBar } from '@coreui/react-chartjs';

const BarChart = ({ charts }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {charts.map((chart, index) => (
        <CChartBar
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

export default BarChart;

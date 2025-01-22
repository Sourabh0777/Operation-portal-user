/* eslint-disable react/prop-types */
import React from 'react';
import { CChartPolarArea } from '@coreui/react-chartjs';

const PolarAreaChart = ({ charts }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {charts.map((chart, index) => (
        <CChartPolarArea
          key={index}
          data={{
            labels: chart.labels,
            datasets: chart.datasets,
          }}
          style={{ height: '300px', width: '300px' }} 
        />
      ))}
    </div>
  );
};

export default PolarAreaChart;

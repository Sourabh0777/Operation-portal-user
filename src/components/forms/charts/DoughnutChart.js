/* eslint-disable react/prop-types */
import React from 'react';
import { CChartDoughnut } from '@coreui/react-chartjs';

const DoughnutChart = ({ charts }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {charts.map((chart, index) => (
        <CChartDoughnut
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

export default DoughnutChart;

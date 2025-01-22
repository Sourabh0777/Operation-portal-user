/* eslint-disable react/prop-types */
import React from 'react';
import { CChartRadar } from '@coreui/react-chartjs';

const RadarChart = ({ charts }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {charts.map((chart, index) => (
        <CChartRadar
          key={index}
          data={{
            labels: chart.labels,
            datasets: chart.datasets,
          }}
          style={{ height: '300px', width: '300px' }} // Chart dimensions
        />
      ))}
    </div>
  );
};

export default RadarChart;

/* eslint-disable react/prop-types */
import React from 'react';
import { CChartPie } from '@coreui/react-chartjs';

const PieChart = ({ charts }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {charts.map((chart, index) => (
        <CChartPie
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

export default PieChart;

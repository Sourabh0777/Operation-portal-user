import React from 'react';
import { CWidgetStatsE } from '@coreui/react';
import { CChartBar, CChartLine } from '@coreui/react-chartjs';

const WidgetChartDisplay = ({ widgets }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
      {widgets.map((widget, index) => (
        <CWidgetStatsE
          key={index}
          value={widget.value}
          title={widget.title}
          chart={
            widget.chartType === 'bar' ? (
              <CChartBar
                className="mx-auto"
                style={{ height: '40px', width: '80px' }}
                data={widget.chartData}
                options={widget.chartOptions}
              />
            ) : (
              <CChartLine
                className="mx-auto"
                style={{ height: '40px', width: '80px' }}
                data={widget.chartData}
                options={widget.chartOptions}
              />
            )
          }
          style={{ flex: '1 1 auto', maxWidth: '300px' }}
        />
      ))}
    </div>
  );
};

export default WidgetChartDisplay;

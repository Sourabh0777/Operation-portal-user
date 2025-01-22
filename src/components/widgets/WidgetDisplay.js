import React from 'react';
import { CWidgetStatsB } from '@coreui/react';

const WidgetDisplay = ({ widgets }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
      {widgets.map((widget, index) => (
        <CWidgetStatsB
          key={index}
          value={widget.value}
          title={widget.title}
          progress={widget.progress}
          text={widget.text}
          style={{ flex: '1 1 auto', maxWidth: '300px' }}
        />
      ))}
    </div>
  );
};

export default WidgetDisplay;
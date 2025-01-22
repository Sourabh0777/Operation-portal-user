import React from 'react';
import { CWidgetStatsC } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPeople, cilUserFollow, cilBasket, cilChartPie, cilSpeedometer } from '@coreui/icons';

const WidgetStatsCList = ({ widgets }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
      {widgets.map((widget, index) => (
        <CWidgetStatsC
          key={index}
          icon={<CIcon icon={widget.icon} height={36} />}
          value={widget.value}
          title={widget.title}
          progress={{ color: widget.progressColor, value: widget.progressValue }}
          style={{ flex: 1, maxWidth: '18%' }}
        />
      ))}
    </div>
  );
};

export default WidgetStatsCList;

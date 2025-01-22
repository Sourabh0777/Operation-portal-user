import React from 'react';
import { CCol } from '@coreui/react';
import { CWidgetStatsF } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSettings, cilUser, cilMoon, cilBell } from '@coreui/icons';

const WidgetStatsList = ({ widgets }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
      {widgets.map((widget, index) => (
        <CCol key={index} xs={12} sm={6} xl={2} xxl={2} style={{ flex: 1, maxWidth: '30%' }}>
          <CWidgetStatsF
            icon={<CIcon width={24} icon={widget.icon} size="xl" />}
            title={widget.title}
            value={widget.value}
            color={widget.color}
          />
        </CCol>
      ))}
    </div>
  );
};

export default WidgetStatsList;

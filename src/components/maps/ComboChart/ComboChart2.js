import { Chart } from 'react-google-charts';
import React from 'react';
import { Spinner } from 'react-bootstrap';

function ComboChart2({ comboChartData }) {
  return (
    <div style={{ overflow: 'hidden', height: '100%' }}>
      {comboChartData.length !== 0 && (
        <Chart
          width={'100%'}
          height={'100%'}
          chartType='ComboChart'
          loader={
            <>
              <div
                className='spinner'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Spinner animation='border' variant='primary' />
              </div>
            </>
          }
          data={[['State', 'TFC', 'AR', 'SO2', 'DTFC'], ...comboChartData]}
          options={{
            title: 'Relation b/w Total Forest Cover, AR, SO2 & DTFC',
            vAxis: {
              title: 'Annual Data',
              viewWindowMode: 'explicit',
              viewWindow: { min: 0 },
            },
            hAxis: { title: 'State' },
            seriesType: 'bars',
            // series: { 5: { type: 'line' }, 3: { type: 'line' } },
            //   series: {  },
            series: { 3: { type: 'line' } },
            backgroundColor: 'transparent',
            chartArea: {
              width: '80%',
              height: '68%',
            },
            legend: {
              position: 'right',
            },
            isStacked: 'true',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      )}
    </div>
  );
}

export default ComboChart2;

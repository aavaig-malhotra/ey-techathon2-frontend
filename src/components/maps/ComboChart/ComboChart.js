import { Chart } from 'react-google-charts';
import React from 'react';
import { Spinner } from 'react-bootstrap';

function ComboChart({ comboChartData }) {
  return (
    <div style={{ overflowY: 'hidden', height: '80%' }}>
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
          data={[['Year', 'TFC', 'AR', 'SPM'], ...comboChartData]}
          options={{
            title: 'Relation b/w TFC, AR, SPM',
            vAxis: {
              title: 'Annual Data',
              viewWindowMode: 'explicit',
              viewWindow: { min: 0 },
            },
            hAxis: { title: 'Year' },
            seriesType: 'bars',
            // series: { 5: { type: 'line' }, 3: { type: 'line' } },
            //   series: {  },
            series: { 1: { type: 'line' }, 2: { type: 'line' } },
            backgroundColor: 'transparent',
            chartArea: {
              width: '70%',
              height: '73%',
            },
            legend: {
              position: 'bottom',
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      )}
    </div>
  );
}

export default ComboChart;

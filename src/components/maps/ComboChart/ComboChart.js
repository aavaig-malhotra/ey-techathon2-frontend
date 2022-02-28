import { Chart } from 'react-google-charts';
import React from 'react';
import { Spinner } from 'react-bootstrap';

function ComboChart({ comboChartData }) {
  return (
    <div style={{ overflowY: 'hidden', height: '95%' }}>
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
          data={[
            ['Year', 'Total Forest Cover (TFC)', 'Annual Rainfall(AR)'],
            ...comboChartData,
          ]}
          options={{
            title: 'Relation b/w Total Forest Cover , Annual Rainfal',
            titleTextStyle: {
              fontSize: 17,
            },

            vAxis: {
              title: 'Annual Data',
              viewWindowMode: 'explicit',
              viewWindow: { min: 0 },
            },

            hAxis: { title: 'Year', showTextEvery: 3 },
            seriesType: 'bars',
            // series: { 5: { type: 'line' }, 3: { type: 'line' } },
            //   series: {  },
            series: {
              1: { type: 'line', curveType: 'function' },
              2: { type: 'line', curveType: 'function' },
            },
            backgroundColor: 'transparent',
            chartArea: {
              width: '70%',
              height: '73%',
              top: '10%',
              right: '10%',
              // left: '10',
            },
            colors: ['lightpink', 'darkgreen', 'blue'],
            legend: {
              position: 'bottom',
              maxLines: 2,
            },
            lineWidth: 3,
            // tooltip: { textStyle: { color: '#FF0000' }, showColorCode: true },
            tooltip: {
              ignoreBounds: true,
            },
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      )}
    </div>
  );
}

export default ComboChart;

import React from 'react';
import { Spinner } from 'react-bootstrap';
import Chart from 'react-google-charts';

function LineChart3({ dataApi, forestCover, years, forestData }) {
  return (
    <div style={{ overflow: 'hidden', height: '100%' }}>
      {dataApi.length !== 0 && (
        <Chart
          width={'100%'}
          height={'100%'}
          chartType='LineChart'
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
            ['years', 'TFC', 'VDC', 'MDC', 'MFC', 'OFA', 'SLA'],

            ...forestData,
          ]}
          options={{
            title: 'Types of Land Cover : TrendLine',
            hAxis: {
              title: 'Year',
            },
            vAxis: {
              title: 'Forest Area (in sq. km.)',
              viewWindowMode: 'explicit',
              viewWindow: { min: 0 },
            },
            series: {
              1: { curveType: 'function' },
            },
            backgroundColor: 'transparent',
            chartArea: {
              width: '80%',
              height: '60%',
            },
            legend: {
              position: 'bottom',
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      )}
    </div>
  );
}

export default LineChart3;

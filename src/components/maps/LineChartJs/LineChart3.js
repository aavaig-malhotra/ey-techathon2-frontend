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
            [
              'years',
              'Total Forest Cover (TFC)',
              'Very Dense Forest Cover (VDC) ',
              'Moderately Dense Forest Area (MDA) ',
              'Mangrove Forest Area (MFA)',
              'Open Forest Area (OFA)',
              'Scrub Land Area (SLA)',
            ],

            ...forestData,
          ]}
          options={{
            title: 'Types of Land Cover : TrendLine',
            titleTextStyle: {
              fontSize: 18,
            },
            hAxis: {
              title: 'Year',
              showTextEvery: 3,
            },
            vAxis: {
              title: 'Forest Area (in sq. km.)',
              viewWindowMode: 'explicit',
              viewWindow: { min: 0 },
            },
            series: {
              0: { curveType: 'function' },
              1: { curveType: 'function' },
              2: { curveType: 'function' },
              3: { curveType: 'function' },
              4: { curveType: 'function' },
              5: { curveType: 'function' },
            },
            backgroundColor: 'transparent',
            chartArea: {
              width: '70%',
              height: '73%',
              top: '10%',
              right: '8%',
              left: '14%',
            },
            legend: {
              position: 'bottom',
              // maxLines: 2,
            },
            lineWidth: 3,
            tooltip: {
              ignoreBounds: true,
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
      )}
    </div>
  );
}

export default LineChart3;

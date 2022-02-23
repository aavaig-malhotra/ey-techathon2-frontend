import React from 'react';
import { Spinner } from 'react-bootstrap';
import Chart from 'react-google-charts';

function LineChart2({ rainfall }) {
  return (
    <div style={{ height: '100% !important' }}>
      {rainfall.length !== 0 && (
        <Chart
          // width={'100%'}
          // height={'100%'}
          chartType='LineChart'
          data={[['Year', 'Annual Rainfall'], ...rainfall]}
          options={{
            title: 'Annual Rainfall Trendline',
            titleTextStyle: {
              fontSize: 18,
            },
            hAxis: {
              title: 'Time',
            },
            vAxis: {
              title: 'Annual Rainfall',
            },
            backgroundColor: 'transparent',
            chartArea: {
              width: '80%',
              height: '100%',
              top: '15%',
              right: '8%',
              left: '10%',
              bottom: '15%',
            },
            legend: {
              position: 'bottom',
            },
            lineWidth: 3,
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      )}
    </div>
  );
}

export default LineChart2;

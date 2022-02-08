import React from 'react';
import Chart from 'react-google-charts';

function Top5BarChart({ data, title }) {
  return (
    <div style={{ overflow: 'hidden', height: '100%' }}>
      {data.length !== 0 && (
        <Chart
          width={'100%'}
          height={'100%'}
          chartType='BarChart'
          loader={<div>Loading Chart</div>}
          data={[['State', 'Value'], ...data]}
          options={{
            title: `Top 5 ${title}`,
            //   width: 600,
            //   height: 400,
            bar: { groupWidth: '95%' },
            legend: { position: 'none' },
            chartArea: {
              width: '80%',
              height: '70%',
            },
            hAxis: {
              minValue: 0,
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '6' }}
        />
      )}
    </div>
  );
}

export default Top5BarChart;

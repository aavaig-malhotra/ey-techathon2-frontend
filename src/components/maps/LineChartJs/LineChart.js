import React, { useState, useEffect } from 'react';

import { Line as LineJS } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LineChart = ({ dataApi, forestCover, years }) => {
  return (
    <>
      <div style={{ overflowX: 'auto' }}>
        {dataApi.length !== 0 && (
          <Line
            data={{
              labels: years,
              datasets: [
                {
                  label: 'forestCover',
                  data: forestCover,
                  backgroundColor: ['rgb(255, 99, 132)'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                  borderWidth: 1,
                },
              ],
            }}
            height={150}
            width={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: false,
                  ticks: {
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
};

export default LineChart;

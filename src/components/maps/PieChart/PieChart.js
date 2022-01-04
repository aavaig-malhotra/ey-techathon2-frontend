import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Chart from 'react-google-charts';

function PieChart({ forestDataObject }) {
  const [selectedYear, setSelectedYear] = useState(2019);
  const [selectedIndex, setSelectedIndex] = useState(16);

  const calculate = (val) => (val / 3287469) * 100;

  return (
    <div style={{ overflow: 'hidden' }}>
      {forestDataObject.length !== 0 && (
        <>
          <div className='forest-data-selector'>
            <select
              value={selectedIndex}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedIndex(e.target.value);
              }}
            >
              {forestDataObject.map((val, idx) => (
                <option value={idx}>{forestDataObject[idx].year}</option>
              ))}
            </select>
          </div>
          <Chart
            // width={'100%'}
            // height={'100%'}
            chartType='PieChart'
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
              ['Forest Cover', '%Cover'],
              ['VDC', calculate(forestDataObject[selectedIndex]['VDC'])],
              ['MDC', calculate(forestDataObject[selectedIndex]['MDC'])],
              ['MFC', calculate(forestDataObject[selectedIndex]['MFC'])],
              ['OFA', calculate(forestDataObject[selectedIndex]['OFA'])],
              ['SLA', calculate(forestDataObject[selectedIndex]['SLA'])],
            ]}
            options={{
              // title: 'Forest Cover of 2019',
              // Just add this option
              title: 'Distribution of Types of Land Cover',
              // legend: 'non',
              //   is3D: true,
              slices: {
                0: { color: '#FEBA69' },
                1: { color: '#FF718B' },
                2: { color: '#999' },
                3: { color: '#8675FF' },
                4: { color: '#69FFBB' },
              },
              pieSliceTextStyle: {
                color: 'black',
              },
              backgroundColor: 'transparent',
              chartArea: {
                width: '60%',
                height: '60%',
              },
              legend: {
                position: 'bottom',
              },
            }}
            rootProps={{ 'data-testid': '2' }}
          />
        </>
      )}
    </div>
  );
}

export default PieChart;

import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Chart from 'react-google-charts';

function PieChart({ forestDataObject }) {
  const [selectedYear, setSelectedYear] = useState(2019);
  const [selectedIndex, setSelectedIndex] = useState(16);

  const calculate = (val) => (val / 3287469) * 100;

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      {forestDataObject.length !== 0 && (
        <>
          <div
            className='forest-data-selector'
            style={{ display: 'flex', alignItems: 'center' }}
          >
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

            <h3
              className='title'
              style={{ fontWeight: 700, fontSize: '20px', marginLeft: '40px' }}
            >
              Distribution of Types of Land Cover
            </h3>
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
              [
                'Very Dense Forest Cover (VDC)',
                calculate(forestDataObject[selectedIndex]['VDC']),
              ],
              [
                'Moderately Dense Forest Cover (MDC)',
                calculate(forestDataObject[selectedIndex]['MDC']),
              ],
              [
                'Mangrove Forest Cover (MFC)',
                calculate(forestDataObject[selectedIndex]['MFC']),
              ],
              [
                'Open Forest Area (OFA)',
                calculate(forestDataObject[selectedIndex]['OFA']),
              ],
              [
                'Scrub Land Area (SLA)',
                calculate(forestDataObject[selectedIndex]['SLA']),
              ],
            ]}
            options={{
              // title: 'Forest Cover of 2019',
              // Just add this option
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
                width: '100%',
                height: '85%',
                right: 0,
                // left: '25%',
              },
              legend: {
                position: 'labeled',
                textStyle: { fontSize: 16 },
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

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import No2 from '../images/No2.jpg';
import so2 from '../images/so2.jpg';
import spm from '../images/so2.jpg';

function DataAnalysis() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <div className='content' style={{ width: '85%', height: '100%' }}>
        <Row
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '2rem 0',
          }}
        >
          <div className='heading' style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 700, fontSize: '3rem' }}>
              Detailed Analysis of NO2
            </h1>
          </div>
          <div
            className='image'
            style={{
              width: '85%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={No2} alt='no2' />
          </div>
        </Row>

        <Row
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '4rem 0 2rem 0',
          }}
        >
          <div className='heading' style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 700, fontSize: '3rem' }}>
              Detailed Analysis of SO2
            </h1>
          </div>
          <div
            className='image'
            style={{
              width: '85%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={so2} alt='so2' />
          </div>
        </Row>

        <Row
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '4rem 0 0 0',
          }}
        >
          <div className='heading' style={{ textAlign: 'center' }}>
            <h1 style={{ fontWeight: 700, fontSize: '3rem' }}>
              Detailed Analysis of SPM
            </h1>
          </div>
          <div
            className='image'
            style={{
              width: '85%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={spm} alt='spm' />
          </div>
        </Row>
      </div>
    </div>
  );
}

export default DataAnalysis;

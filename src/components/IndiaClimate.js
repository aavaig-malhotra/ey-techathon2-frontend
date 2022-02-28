import React from 'react';
import logo from '../images/india_climate.gif';

function IndiaClimate() {
  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
      <img
        src={logo}
        alt='india climate'
        style={{ height: '78%', width: '100%' }}
      />
    </div>
  );
}

export default IndiaClimate;

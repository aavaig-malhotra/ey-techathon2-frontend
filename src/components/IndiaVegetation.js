import React from 'react';
import logo from '../images/india_vegetation.gif';

function IndiaVegetation({ area = 'india' }) {
  //   let logo = require('/images/india_vegetation.gif');

  return (
    <div style={{ height: '100%' }}>
      <img
        src={logo}
        alt='india vegetation'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default IndiaVegetation;

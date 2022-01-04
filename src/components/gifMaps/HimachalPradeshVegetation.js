import React from 'react';
import logo from '../../images/himachal_pradesh_vegetation.gif';

function HimachalPradeshVegetation() {
  //   let logo = require('/images/india_Vegetation.gif');

  return (
    <div style={{ height: '100%' }}>
      <img
        src={logo}
        alt='Himachal Pradesh Vegetation'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default HimachalPradeshVegetation;

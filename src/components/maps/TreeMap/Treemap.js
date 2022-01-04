import React, { useState, useEffect } from 'react';
import TreeMap from 'react-d3-treemap';
import 'react-d3-treemap/dist/react.d3.treemap.css';
// import rd3 from 'rd3';

function Treemap({ data }) {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2019');

  //   const TreeMap = rd3.Treemap;

  return <div>TreeMap</div>;
}

export default Treemap;

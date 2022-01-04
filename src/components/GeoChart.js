import React, { useState, useRef, useEffect } from 'react';
import { select, geoPath, geoMercator, min, max, scaleLinear } from 'd3';
import useResizeObserver from '../hooks/useResizeObserver';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function GeoChart({ data, property }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [selectedState, setSelectedState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const svg = select(svgRef.current);

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const projection = geoMercator()
      .fitSize([width, height], selectedState || data)
      .precision(100);

    const pathGenerator = geoPath().projection(projection);

    svg
      .selectAll('.state')
      .data(data.features)
      .join('path')
      .on('click', (event, feature) => {
        console.log(feature.properties['NAME_1']);
        // setSelectedState(selectedState === feature ? null : feature);
        navigate(`/${feature.properties['NAME_1']}`);
      })
      .attr('class', 'state')
      .attr('fill', '#add8e6')
      // .attr('fill-outline-color', 'rgba(250,180,195,1)')
      .attr('transform', 'scale(.98)')
      .transition()
      .duration(2000)
      .attr('d', (feature) => pathGenerator(feature));
  }, [data, dimensions, selectedState]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', height: '100%', paddingTop: '5px' }}
      className='d-block w-100'
    >
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GeoChart;

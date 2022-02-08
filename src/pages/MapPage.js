import React, { useState, useEffect } from 'react';
import '../App.css';
import data from '../india.min.geo.json';
import GeoChart from '../components/GeoChart';
import {
  Button,
  ButtonGroup,
  Card,
  Carousel,
  Col,
  Container,
  Dropdown,
  Figure,
  Form,
  ListGroup,
  Row,
  Spinner,
  Table,
  ToggleButton,
} from 'react-bootstrap';
import logo from '../images/twitter-logo.png';
import { FaArrowUp, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import MapBox from '../components/MapBox';
import LineChart from '../components/maps/LineChartJs/LineChart';
import ComboChart from '../components/maps/ComboChart/ComboChart';
import GaugeChart from '../components/maps/GaugeChart/GaugeChart';
import PieChart from '../components/maps/PieChart/PieChart';
import LineChart2 from '../components/maps/LineChartJs/LineChart2';
import BarChart from '../components/maps/BarChart/BarChart';
import LineChart3 from '../components/maps/LineChartJs/LineChart3';
import IndiaVegetation from '../components/IndiaVegetation';
import IndiaClimate from '../components/IndiaClimate';
import CountUp from 'react-countup';
import ComboChart2 from '../components/maps/ComboChart/ComboChart2';
import Top5BarChart from '../components/maps/BarChart/Top5BarChart';
import Bottom5BarChart from '../components/maps/BarChart/Bottom5BarChart';

const localUrl = 'http://127.0.0.1:5000/';
const hostedUrl = 'https://ey-flask-app.herokuapp.com/';

function MapPage() {
  const [normalSelected, setNormalSelected] = useState(true);

  const [indiaData, setIndiaData] = useState([]);
  const [dataApi, setDataApi] = useState([]);
  const [years, setYears] = useState([]);
  const [forestCover, setForestCover] = useState([]);
  const [forestData, setForestData] = useState([]);
  const [forestDataArray, setForestDataArray] = useState([]);
  const [rainfall, setRainfall] = useState([]);
  const [aqiParams, setAqiParams] = useState([]);
  const [aqiArr, setAqiArr] = useState([]);
  const [comboChartData, setComboChartData] = useState([]);
  const [comboChartData2, setComboChartData2] = useState([]);
  const [descVal, setDescVal] = useState([]);
  const [top5, setTop5] = useState([]);
  const [bottom5, setBottom5] = useState([]);
  const [topBottomParam, setTopBottomParam] = useState('Annual Rainfall');
  const [topBottomYear, setTopBottomYear] = useState(2015);
  const [stateApi, setStateApi] = useState({});
  const [tweetNRating, setTweetNRating] = useState(null);
  const [comboData2Year, setComboData2Year] = useState(2015);

  const [inputYear, setInputYear] = useState(2022);
  const [inputArea, setInputArea] = useState('India');
  const [predictedResult, setPredictedResult] = useState(665688.922946932);

  const [hashtag, setHashtag] = useState('forest cover');

  const [view, setView] = useState('Normal View');

  const fetchData = async () => {
    const response = await fetch(hostedUrl, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // console.log(data.Data);

    setYears(Object.keys(data.Data));

    setForestCover(
      years.map((item) => data.Data[item]['Total Forest Cover Area'])
    );

    const annualRainfall = Object.keys(data.Data).map((year) => [
      year,
      data.Data[year]['Annual Rainfall'],
    ]);

    setRainfall(annualRainfall.filter((item) => item[1] !== 0));

    setDataApi([data.Data]);

    const forestObj = Object.keys(data.Data).map((year) => {
      return {
        year,
        TFC: data.Data[year]['Total Forest Cover Area'],
        VDC: data.Data[year]['Very Dense Forest Area'],
        MDC: data.Data[year]['Moderately Dense Forest Area'],
        MFC: data.Data[year]['Mangrove Forest Area'],
        OFA: data.Data[year]['Open Forest Area'],
        SLA: data.Data[year]['Scrub Land Area'],
      };
    });

    // console.log(forestObj);

    const forestArr = Object.keys(data.Data).map((year) => {
      return [
        year,
        data.Data[year]['Total Forest Cover Area'],
        data.Data[year]['Very Dense Forest Area'],
        data.Data[year]['Moderately Dense Forest Area'],
        data.Data[year]['Mangrove Forest Area'],
        data.Data[year]['Open Forest Area'],
        data.Data[year]['Scrub Land Area'],
      ];
    });

    // console.log(forestObj);
    setForestData(forestObj);

    setForestDataArray(forestArr);

    const aqiVal = {
      year: 2015,
      SO2: data.Data['2015']['SO2'],
      NO2: data.Data['2015']['NO2'],
      RSPM: data.Data['2015']['RSPM'],
      SPM: data.Data['2015']['SPM'],
      PM25: data.Data['2015']['PM25'],
    };

    const aqiValArr = Object.keys(data.Data).map((year) => {
      return {
        year: year,
        SO2: data.Data[year]['SO2'],
        NO2: data.Data[year]['NO2'],
        RSPM: data.Data[year]['RSPM'],
        SPM: data.Data[year]['SPM'],
        PM25: data.Data[year]['PM25'],
      };
    });

    setAqiParams(aqiVal);

    // aqiValArr.forEach((val, idx) => console.log(aqiValArr[idx].year));

    // console.log(aqiValArr);

    setAqiArr(aqiValArr);

    const comboData = Object.keys(data.Data).map((year) => [
      year,
      data.Data[year]['Total Forest Cover Area'],
      data.Data[year]['N_Annual_Rainfall'],
      data.Data[year]['N_SPM'],
    ]);

    // console.log(comboData);
    setComboChartData(comboData);
  };

  const stateData = async (year) => {
    const formData = new FormData();
    formData.append('year', year);

    const response = await fetch(`${hostedUrl}state`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    });

    const data = await response.json();

    console.log(data);
    setStateApi(data);

    updateStackedData(data);
  };

  const stateComboData = async (year) => {
    const formData = new FormData();
    formData.append('year', year);

    const response = await fetch(`${hostedUrl}state`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    });

    const data = await response.json();

    const comboData = Object.keys(data)
      .filter((state) => state !== 'India')
      .map((state) => [
        state,
        data[state]['Total Forest Cover Area'],
        data[state]['Annual Rainfall'],
        data[state]['SO2'],
        data[state]['Open Forest Area'],
      ]);

    setComboChartData2(comboData);
  };

  const updateStackedData = (data, param = 'Annual Rainfall') => {
    // console.log('clicked here');
    console.log(data, param);

    const sortData = Object.keys(data)
      .filter((state) => state !== 'India')
      .map((state) => {
        return [state, data[state][param]];
      });

    // console.log(sortData);

    const sortedData = [...sortData];

    sortedData.sort((a, b) => b[1] - a[1]);

    // console.log(sortedData);
    // console.log(sortedData[sortedData.length - 5]);

    setTop5(sortedData.slice(0, 5));
    setBottom5(sortedData.slice(sortedData.length - 5));

    // console.log(sortedData.slice(0, 5));
    // console.log(sortedData.slice(sortedData.length - 5));
  };

  const getTweetRating = async () => {
    const formData = new FormData();

    formData.append('tag', hashtag);

    const response = await fetch(`${hostedUrl}rating`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    });

    const data = await response.json();
    // console.log(data);

    setTweetNRating(data);
  };

  const onSubmitPostRequest = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('year', inputYear);
    formData.append('area', inputArea);

    // console.log(inputYear, inputArea);

    fetch(`${hostedUrl}predict/TFA`, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ year: inputYear, area: inputArea }),
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data['Result']);
        setPredictedResult(data['Result']);
      });
  };

  useEffect(() => {
    fetchData();
    getTweetRating();
  }, [dataApi.length]);

  useEffect(() => {
    console.log(topBottomYear);
    stateData(topBottomYear);
  }, [topBottomYear]);

  useEffect(() => {
    stateComboData(comboData2Year);
  }, [comboData2Year]);

  return (
    <React.Fragment>
      <Container className='main-container' fluid>
        <Row
          style={{ height: '100%' }}
          className='map-page-row map-page-row-top'
        >
          {/* col-left */}
          <Col style={{ height: '100%' }} className='left-col'>
            <Row>
              <Col style={{ height: '100%' }} className='left-container'>
                <div className='left-container__heading'>
                  <h1>
                    <CountUp end={predictedResult} duration={5} delay={8} />
                    sq. km.
                  </h1>
                </div>
                <div className='left-container__top--tags'>
                  <h1>Predicted Forest Cover Area of {inputArea}</h1>
                  <p>by {inputYear}</p>
                </div>
                <div className='left-container__top--stats'>
                  <h1>Forest</h1>
                  <p>Lungs of Earth</p>
                </div>
                <></>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='prediction-form'>
                  <div className='prediction-input--year'>
                    <label for='input-year'>Year</label>
                    <input
                      type='text'
                      value={inputYear}
                      onChange={(e) => setInputYear(e.target.value)}
                      id='input-year'
                      placeholder='Enter year ...'
                    />
                  </div>

                  <div className='prediction-input--area'>
                    <label for='input-area'>Area</label>
                    <input
                      type='text'
                      value={inputArea}
                      onChange={(e) => setInputArea(e.target.value)}
                      id='input-area'
                      placeholder='Enter area ...'
                    />
                  </div>

                  <div className='prediction-input--submit'>
                    <button type='submit' onClick={onSubmitPostRequest}>
                      Go{' '}
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          {/* col-middle */}
          <Col
            xs
            lg={6}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
            }}
            className='mid-col'
          >
            <div className='map-toggle-buttons'>
              <select
                value={view}
                onChange={(e) => {
                  // console.log(e.target.value);
                  setView(e.target.value);
                }}
              >
                <option value='Normal View'>Normal View</option>
                <option value='Satellite View'>Satellite View</option>
                <option value='Vegetation Timelapse'>
                  Vegetation Timelapse
                </option>
                <option value='Climate Timelapse'>Climate Timelapse</option>
              </select>
            </div>
            <></>
            {view === 'Normal View' && (
              <>
                <GeoChart data={data} />
              </>
            )}
            {view === 'Satellite View' && (
              <>
                <MapBox />
              </>
            )}
            {view === 'Vegetation Timelapse' && (
              <>
                <IndiaVegetation />
              </>
            )}
            {view === 'Climate Timelapse' && (
              <>
                <IndiaClimate />
              </>
            )}
          </Col>

          {/* col-right */}
          <Col style={{ height: '100%' }} className='right-col'>
            <Row style={{ height: '100%' }}>
              <Col
                style={{ height: '100%', padding: ' 2rem' }}
                className='right-container'
              >
                <Card
                  bg='light'
                  // border='light'
                  style={{
                    width: '100%',
                    border: '1px transparent',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                  className='mb-2 right-container__top box-shadow-main'
                >
                  <Card.Body>
                    {dataApi.length === 0 ? (
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
                    ) : (
                      <>
                        <LineChart3
                          dataApi={dataApi}
                          forestCover={forestCover}
                          years={years}
                          forestData={forestDataArray}
                        />
                      </>
                    )}
                  </Card.Body>
                </Card>
                <Card
                  bg='light'
                  style={{ width: '100%' }}
                  className='mb-2 right-container__bottom box-shadow-main global-card-styles'
                  // border='light'
                >
                  <Card.Body>
                    {dataApi.length === 0 ? (
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
                    ) : (
                      <>
                        <ComboChart comboChartData={comboChartData} />
                      </>
                    )}

                    <Card.Title></Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* 3-cards */}
        <Row className='map-page-row map-page-row-mid-1'>
          <Col className='container-card aqi-meter' style={{ padding: '2rem' }}>
            <Card
              bg='light'
              style={{ width: '100%' }}
              className='mb-2 right-container__bottom box-shadow-main global-card-styles aqi-meter-card'
              // border='light'
            >
              <Card.Body>
                {dataApi.length === 0 ? (
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
                ) : (
                  <>
                    <GaugeChart aqiParams={aqiParams} aqiArr={aqiArr} />
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col
            className='container-card land-cover-graph'
            style={{ padding: '2rem' }}
          >
            <Card
              bg='light'
              style={{ width: '100%' }}
              className='mb-2 right-container__bottom box-shadow-main global-card-styles land-cover-graph-card'
              // border='light'
            >
              <Card.Body>
                {dataApi.length === 0 ? (
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
                ) : (
                  <>
                    <PieChart
                      // forestData={forestDataArray}
                      forestDataObject={forestData}
                    />
                  </>
                )}

                <Card.Title></Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col
            className='container-card rainfall-graph'
            style={{ padding: '2rem' }}
          >
            <Card
              bg='light'
              style={{ width: '100%' }}
              className='mb-2 right-container__bottom box-shadow-main global-card-styles rainfall-graph-card'
              // border='light'
            >
              <Card.Body>
                {dataApi.length === 0 ? (
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
                ) : (
                  <>
                    <LineChart2 rainfall={rainfall} />
                  </>
                )}

                <Card.Title></Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className='map-page-row'>
          <Col className='container-card' style={{ padding: '2rem' }}>
            <Card
              bg='light'
              style={{ width: '100%' }}
              className='mb-2 right-container__bottom box-shadow-main global-card-styles combo-chart-card'
              // border='light'
            >
              <Card.Body style={{ height: '40rem' }}>
                <div className='select-dropdowns combo-select-year'>
                  <select
                    value={comboData2Year}
                    onChange={(e) => {
                      setComboData2Year(e.target.value);
                    }}
                  >
                    <option value='1987'>1987</option>
                    <option value='1989'>1989</option>
                    <option value='1991'>1991</option>
                    <option value='1993'>1993</option>
                    <option value='1995'>1995</option>
                    <option value='1997'>1997</option>
                    <option value='1999'>1999</option>
                    <option value='2001'>2001</option>
                    <option value='2003'>2003</option>
                    <option value='2005'>2005</option>
                    <option value='2007'>2007</option>
                    <option value='2009'>2009</option>
                    <option value='2011'>2011</option>
                    <option value='2013'>2013</option>
                    <option value='2015'>2015</option>
                    <option value='2017'>2017</option>
                    <option value='2019'>2019</option>
                  </select>
                </div>

                {dataApi.length === 0 ? (
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
                ) : (
                  <>
                    <ComboChart2 comboChartData={comboChartData2} />
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row
          className='map-page-row map-page-bottom-row'
          style={{ paddingBottom: '10px' }}
        >
          <Col
            xs
            lg={6}
            className='map-page-bottom-container-1'
            // style={{ marginRight: '5px' }}
          >
            <div
              className='select-dropdowns'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0 2rem',
                marginBottom: '15px',
                margin: '0 auto',
              }}
            >
              {/* parameters */}
              <select
                value={topBottomParam}
                onChange={(e) => {
                  console.log(e.target.value);
                  const param = e.target.value;
                  setTopBottomParam(e.target.value);
                  updateStackedData(stateApi, param);
                }}
              >
                <option value='Annual Rainfall'>Annual Rainfall</option>
                <option value='Geographical Area'>Geographical Area</option>
                <option value='Mangrove Forest Area'>
                  Mangrove Forest Area
                </option>
                <option value='Moderately Dense Forest Area'>
                  Moderately Dense Forest Area
                </option>
                <option value='Open Forest Area'>Open Forest Area</option>
                <option value='Scrub Land Area'>Scrub Land Area</option>
                <option value='Total Forest Cover Area'>
                  Total Forest Cover Area
                </option>
                <option value='Very Dense Forest Area'>
                  Very Dense Forest Area
                </option>
              </select>

              {/* years */}
              <select
                value={topBottomYear}
                onChange={(e) => setTopBottomYear(e.target.value)}
              >
                <option value='1987'>1987</option>
                <option value='1989'>1989</option>
                <option value='1991'>1991</option>
                <option value='1993'>1993</option>
                <option value='1995'>1995</option>
                <option value='1997'>1997</option>
                <option value='1999'>1999</option>
                <option value='2001'>2001</option>
                <option value='2003'>2003</option>
                <option value='2005'>2005</option>
                <option value='2007'>2007</option>
                <option value='2009'>2009</option>
                <option value='2011'>2011</option>
                <option value='2013'>2013</option>
                <option value='2015'>2015</option>
                <option value='2017'>2017</option>
                <option value='2019'>2019</option>
              </select>
            </div>
            <div
              className='top-bottom-cards'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                // alignItems: 'center',
                width: '100%',
              }}
            >
              <Row
                style={{
                  marginBottom: '1rem',
                  // width: '100%',
                  display: 'flex',
                  justifyContent: 'end',
                  padding: '2rem',
                }}
                className='map-row-bottom-left-container'
              >
                {' '}
                <Card
                  bg='light'
                  style={{ width: '100%' }}
                  className='mb-2 right-container__bottom box-shadow-main global-card-styles map-row-bottom-card'
                  // border='light'
                >
                  <Card.Body>
                    <Top5BarChart data={top5} title={topBottomParam} />
                  </Card.Body>
                </Card>
              </Row>

              <Row
                className='map-row-bottom-left-container'
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  padding: '2rem',
                }}
              >
                {' '}
                <Card
                  bg='light'
                  style={{
                    width: '100%',
                  }}
                  className='right-container__bottom box-shadow-main global-card-styles map-row-bottom-card'
                  // border='light'
                >
                  <Card.Body>
                    <Bottom5BarChart data={bottom5} title={topBottomParam} />
                  </Card.Body>
                </Card>
              </Row>
            </div>
          </Col>
          <Col
            xs
            lg={6}
            className='map-page-bottom-container-2'
            style={{ padding: '2rem' }}
          >
            {' '}
            <Card
              bg='light'
              style={{ width: '100%' }}
              className='right-container__bottom box-shadow-main global-card-styles map-row-bottom-card'
              // border='light'
            >
              <Card.Title
                style={{
                  marginTop: '1rem',
                  textAlign: 'center',
                  fontSize: '2rem',
                  fontWeight: '700',
                }}
              >
                <img
                  src={logo}
                  alt='twitter-logo'
                  style={{ height: '30px', width: '30px' }}
                />
                Tweet Sentiment Analysis
              </Card.Title>
              <Card.Body>
                <div
                  className='twitter-form'
                  style={{
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Form.Control
                    size='lg'
                    type='text'
                    placeholder='#Hashtag'
                    style={{ width: '80%', marginRight: '2rem' }}
                    value={hashtag}
                    onChange={(e) => setHashtag(e.target.value)}
                  />
                  <Button
                    variant='primary'
                    type='submit'
                    style={{ height: '100%' }}
                    onClick={(e) => {
                      e.preventDefault();
                      // getTweetRating();
                    }}
                  >
                    Submit
                  </Button>
                </div>

                <ListGroup as='ol'>
                  {tweetNRating !== null &&
                    Object.keys(tweetNRating).map((tweet) => {
                      if (tweetNRating[tweet] === 'Positive') {
                        return (
                          <>
                            <ListGroup.Item
                              as='li'
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <div className='tweet'>
                                <p> {tweet}</p>
                              </div>

                              <div className='tweet-icon'>
                                <FaThumbsUp
                                  style={{
                                    height: '15px',
                                    width: '15px',
                                    color: 'green',
                                  }}
                                />
                              </div>
                            </ListGroup.Item>
                          </>
                        );
                      }

                      return (
                        <>
                          <ListGroup.Item
                            as='li'
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div className='tweet'>
                              <p> {tweet}</p>
                            </div>

                            <div className='tweet-icon'>
                              <FaThumbsDown
                                style={{
                                  height: '15px',
                                  width: '15px',
                                  color: 'red',
                                }}
                              />
                            </div>
                          </ListGroup.Item>
                        </>
                      );
                    })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default MapPage;

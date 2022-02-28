import React from 'react';
import './App.css';
import MapPage from './pages/MapPage';
import NavBar from './components/NavBar/NavBar';

// import { Button, Container, Row, Col, Figure } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StatesPage from './pages/StatesPage';
import DataAnalysis from './pages/DataAnalysis';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <div className='wrapper-container'>
          <Routes>
            <Route path='/' exact element={<MapPage />} />
            <Route path='/:state' element={<StatesPage />} />
            <Route path='/detailed-analysis' element={<DataAnalysis />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

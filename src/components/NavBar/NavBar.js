import React from 'react';
import logo from '../../images/geosis-removebg-preview.png';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ToggleButton from 'react-bootstrap/ToggleButton';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar
        bg='light'
        variant='light'
        className='navbar-nav greenary-nav'
        sticky='top'
      >
        <Container>
          <div className='greenary-logo' onClick={() => navigate(`/`)}>
            <div
              className='logo-container'
              style={{ height: '40px', marginRight: '10px' }}
            >
              <img
                src={logo}
                alt='geosis logo'
                style={{ height: '100%', width: '100%' }}
              />
            </div>
            GeoSis
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;



import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button, Navbar } from 'react-bootstrap';
import Home2 from '../user/Home';
//import frontVideo from '../../Video/bg.mp4'; // Import your video file

const Home = () => {
   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>TastyTrails</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav
                     className="me-auto my-2 my-lg-0"
                     style={{ maxHeight: '100px' }}
                     navbarScroll
                  >
                  </Nav>
                  <Nav>
                     <Link to={'/'}>Home</Link>
                     <Link to={'/about'}>About</Link>
                     <Link to={'/login'}>Login</Link>
                     <Link to={'/register'}>Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div id='home-container' className='first-container front'>
            {/* <video autoPlay loop muted>
               <source src={frontVideo} type="video/mp4" />
               Your browser does not support the video tag.
            </video> */}
            <div className="content-home">
               <p>            TASTY  TRAILS <br /> </p>
               <Button className='m-2' variant='outline-warning' size='lg'>
                  <Link to={'/register'}>Post Blog Now!</Link>
               </Button>
            </div>
         </div>

         <Container className="">
            <h2 className="text-center my-4">Blogs to Show</h2>
            <div>
               <Home2 />
            </div>
         </Container>
      </>
   );
}

export default Home;


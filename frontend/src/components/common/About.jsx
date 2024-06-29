

import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import loginImage from '../../Images/food.jpg';
import atImage from '../../Images/aboutimg.jpg';
import bgImage from '../../Images/fbg.jpg';
// import './About.css'; // Import CSS

const About = () => {
   const containerStyle = {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
      minHeight: '100vh', // Ensure the container takes at least full viewport height
      overflow: 'auto'    // Make container scrollable if content overflows
   };

   const navLinkStyle = {
      margin: '0 10px', // Add some margin to separate the links
      color: 'black',
      textDecoration: 'none'
   };

   return (
      <div>
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
                     
                     <Link to={'/'} style={navLinkStyle}>Home</Link>
                     <Link to={'/about'} style={navLinkStyle}>About</Link>
                     <Link to={'/login'} style={navLinkStyle}>Login</Link>
                     <Link to={'/register'} style={navLinkStyle}>Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <Container style={containerStyle}>
            <div className='about-content'>
               <div className="left-content">
                  <h3>About Our Blogging Platform</h3>
                  <p>Welcome to Tasty Trails, your go-to destination for all things food.</p>
                  <p>We cover the latest food trends, restaurant reviews, and delicious recipes.</p>
                  <p>Our passion is to explore and share the diverse world of food with fellow enthusiasts.</p>
               </div>
               <div className="right-content swing">
                  <img src={loginImage} alt="Login" className="img-fluid" />
               </div>
            </div>

            <div className='about-content'>
               <div className="right-content swing">
                  <img src={atImage} alt="About" className="img-fluid" />
               </div>
               <div className="left-content">
                  <p>Whether you're a foodie, a home cook, or just looking for culinary inspiration, join us on this tasty journey!</p>
                  <Button className='m-2' variant='outline-warning' size='lg'>
                     <Link to={'/register'} style={{ textDecoration: 'none', color: 'inherit' }}>Learn More!</Link>
                  </Button>
               </div>
            </div>
         </Container>
      </div>
   );
}

export default About;

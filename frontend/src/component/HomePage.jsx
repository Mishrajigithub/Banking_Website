import React from 'react'
import '../App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (

    <div className='maindiv' >
      <section>
        <div class="content">
          <div class="article">
            <h1>
              Your Money, <br />
              Our Responsibility
            </h1>
            <p>
              Welcome to Nitin Bank. It is a high quality, customer centric and
              service driven Bank. We listen, You prosper.
            </p>

            <Link to={"/all-profile"}>
              Get Started
            </Link>
          </div>
          <div class="social">
            <a href="https://www.linkedin.com/in/akash-kumar-8b1842216/"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/Mishrajigithub"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing

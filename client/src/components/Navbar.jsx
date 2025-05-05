import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <header>
        <nav class="navbar navbar-expand-lg bg-light">
          <div class="container">
            <a class="navbar-brand" href="/">SUNNY</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <NavLink class="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/about-us">About</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/services">Services</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/contact-us">Contact</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/register">Register</NavLink>
                </li>
                <li class="nav-item">
                  <NavLink class="nav-link" to="/login">Login</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navbar

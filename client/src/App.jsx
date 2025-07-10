import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ErrorPage from './pages/404';

import "./App.css";
import AdminLayout from './components/layouts/AdminLayout';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<ErrorPage />} />
          {/* Add more admin Nested routes here */}
          <Route path="/admin" element={<AdminLayout />} >
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import React from 'react';
import { useAuth } from '../store/auth';

const AboutUs = () => {

  const { user } = useAuth();

  return (
    <>
      <h1>About Us Page </h1>
      <h2>Name : {user.name}</h2>
    </>
  )
}

export default AboutUs

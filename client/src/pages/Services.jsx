import React from 'react';
import { useAuth } from '../store/auth';

const Services = () => {
  const { services } = useAuth();

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Services</h2>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {services && services.map((service, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{service.service}</h5>
                  <p className="card-text">{service.description}</p>
                  <p className="price-tag text-success fw-bold">${service.price}</p>
                  <p className="text-muted">Provider: {service.provider}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services

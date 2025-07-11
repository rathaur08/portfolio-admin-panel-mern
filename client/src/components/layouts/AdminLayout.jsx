import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      <div className='container'>
        <h1>Admin Dashboard</h1>
        <nav style={{ background: '#222', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <NavLink
                to="/admin/users"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : '#bbb',
                  background: isActive ? '#007bff' : 'transparent',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'background 0.2s'
                })}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/contacts"
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : '#bbb',
                  background: isActive ? '#007bff' : 'transparent',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'background 0.2s'
                })}
              >
                Contacts
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout;

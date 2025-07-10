import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      <div className='container'>
        <h1>Admin Dashboard</h1>
        <nav>
          <ul>
            <li><NavLink to="/admin/users"> Users</NavLink></li>
            <li><NavLink to="/admin/contacts"> Contacts</NavLink></li>
            {/* Add more admin links here */}
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  )
}

export default AdminLayout;

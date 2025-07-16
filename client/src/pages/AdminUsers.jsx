import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';


const AdminUsers = () => {

  const { authorizationToken } = useAuth()
  const [adminUserData, setAdminUserData] = useState("");
  // console.log("Admin User data:", adminUserData);


  const getAllUsersdata = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/admin/users', {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
          // "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Admin User data:", data);
      setAdminUserData(data);

    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  // deleteUser Function on Click Button
  const deleteUser = async (id) => {
    // console.log(id);
    try {
      const response = await fetch(`http://localhost:8000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
        body: JSON.stringify(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Data Delete", data);

      if (response.ok) {
        getAllUsersdata();
      }


    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  useEffect(() => {
    getAllUsersdata();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h1>Users Page</h1>
        <p>This is the admin users management page.</p>
        {Array.isArray(adminUserData.data) && adminUserData.data.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>SR No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Admin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {adminUserData.data.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                    <td>
                      <Link type="button" to={`/admin/users/${user._id}/edit`} className="btn btn-primary btn-sm me-2">Update</Link>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </>
  )
}

export default AdminUsers

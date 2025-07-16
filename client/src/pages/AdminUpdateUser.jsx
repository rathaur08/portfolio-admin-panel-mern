import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminUpdateUser = () => {
  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState(null);
  // console.log("data user: ", user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
            // "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });
        if (!response.ok) throw new Error('User not found');
        const Userdata = await response.json();
        // console.log("data: ", Userdata.data);
        setUser(Userdata.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, authorizationToken]);

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error) return <div className="container mt-4">Error: {error}</div>;

  return (
    <>
      <div className="container mt-4">
        <h1>Edit User Information</h1>
        <p>Use this page to update user details as an admin.</p>
        {user && (
          <div className='w-50'>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                try {
                  const response = await fetch(`http://localhost:8000/api/admin/users/update/${id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: authorizationToken,
                    },
                    body: JSON.stringify({
                      name: user.name,
                      email: user.email,
                      phone: user.phone,
                      isAdmin: user.isAdmin,
                    }),
                  });
                  if (!response.ok) throw new Error('Failed to update user');
                  // Optionally handle success (e.g., show a message)
                  toast.success("User data updated successfully!");
                  navigate("/admin/users")
                } catch (err) {
                  setError(err.message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  className="form-control"
                  type="text"
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  className="form-control"
                  type="email"
                  value={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input
                  className="form-control"
                  type="text"
                  value={user.phone}
                  onChange={e => setUser({ ...user, phone: e.target.value })}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={e => setUser({ ...user, isAdmin: e.target.checked })}
                  id="isAdminCheck"
                />
                <label className="form-check-label" htmlFor="isAdminCheck">
                  Admin
                </label>
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                Update User
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUpdateUser;

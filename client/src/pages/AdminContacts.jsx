import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';

const AdminContacts = () => {

  const { authorizationToken } = useAuth();

  const [contacts, setContacts] = useState([]);
  console.log("contacts Data", contacts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace the URL with your actual API endpoint
    fetch(`http://localhost:8000/api/admin/contacts`, {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authorizationToken]);

  return (
    <div>
      <h1>Contacts</h1>
      <p>View and manage all contact form submissions below.</p>
      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts && contacts.map((contact, idx) => (
                <tr key={contact._id}>
                  <td>{idx + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;

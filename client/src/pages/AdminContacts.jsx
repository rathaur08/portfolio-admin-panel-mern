import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../store/auth';

const AdminContacts = () => {
  const { authorizationToken } = useAuth();

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8000/api/admin/contacts', {
          headers: {
            Authorization: authorizationToken,
          },
        });
        setContacts(res.data.data || []);
      } catch (error) {
        setContacts([]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
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
              {contacts && contacts.length > 0 ? (
                contacts.map((contact, idx) => (
                  <tr key={contact._id || idx}>
                    <td>{idx + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
